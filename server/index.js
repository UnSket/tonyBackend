import graphqlHTTP from 'express-graphql';
import {schema, root} from './controllers/index';
import {MongoClient} from 'mongodb';
import express from 'express';
import bodyParser from "body-parser";
import flash from 'connect-flash';
import session from "express-session";
import authorize from './authorization/authorization';


MongoClient.connect('mongodb://localhost:27017/animals', function (err, client) {
  if (err) throw err;

  const db = client.db('test');

  // Construct a schema, using GraphQL schema language

  var app = express();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(express.static("src"));
  app.use(session({ secret: "cats" }));
  app.use(flash());
  app.use(bodyParser.urlencoded({ extended: false }));

  authorize(app);

  app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }));

  app.listen(4000);
  console.log('Running a GraphQL API server at localhost:4000/graphql');
});
