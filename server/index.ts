import { Container } from 'typedi';
import * as graphqlHTTP from 'express-graphql';
import { MongoClient, Db } from 'mongodb';
import * as express from 'express';
import * as bodyParser from 'body-parser';
// @ts-ignore
import * as flash from 'express-flash';
import * as session from 'express-session';
import authorize from './authorization/authorization';
import * as cookieParser from 'cookie-parser';
import 'source-map-support/register';
import 'reflect-metadata';
import { getSchema } from './resolver/logged/user';


async function connectDb() {
    return new Promise(resolve =>
        MongoClient.connect('mongodb://localhost:27017/animals', function (err, client) {
            if (err) throw err;

            resolve(client.db('test'));

        }));
    }


async function bootstrap() {
    const db = await connectDb();
    Container.set('Db', db);

    const app: express.Application = express();

    const sessionMiddleware = session({
        secret: 'cats',
        resave: true,
        rolling: true,
        saveUninitialized: false,
        cookie: {
            maxAge: 10 * 60 * 1000,
            httpOnly: false,
        },
    });

    app.use(cookieParser());
    app.use(sessionMiddleware);
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(flash());

    const authenticationMiddleware = authorize(app, db);

    app.use(express.static('src'));

    const schema = await getSchema();

    app.use('/graphql', authenticationMiddleware, graphqlHTTP({
        schema: schema
    }));

    app.listen(4000);
    console.log('Running a GraphQL API server at localhost:4000/graphql');
}

bootstrap();
