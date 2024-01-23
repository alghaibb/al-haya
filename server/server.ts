import express from 'express';
import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4'

import { typeDefs, resolvers } from './graphql';
import db from './config/connection'

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server));
}

app.get('/', (req, res) => {
  res.send('Hello From The Server!');
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server Now listening on http://localhost:${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  })
})

startApolloServer();