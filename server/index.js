import graphqlHTTP from 'express-graphql';
import {schema, root} from './controllers/index';
import {MongoClient} from 'mongodb';
import express from 'express';
import bodyParser from "body-parser";
import flash from 'connect-flash';
import session from "express-session";
import authorize from './authorization/authorization';
import passport from 'passport';
import cookieParser from "cookie-parser";


MongoClient.connect('mongodb://localhost:27017/animals', function (err, client) {
  if (err) throw err;

  const db = client.db('test');

  // Construct a schema, using GraphQL schema language
  var app = express();

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

  authorize(app, db);

  app.use(express.static("src"));

  app.use('/graphql', passport.authenticationMiddleware, graphqlHTTP({
    schema: schema,
    rootValue: root
  }));

  app.listen(4000);
  console.log('Running a GraphQL API server at localhost:4000/graphql');
});
