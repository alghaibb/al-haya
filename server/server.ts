import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4'
import { typeDefs, resolvers } from './graphql';
import { authMiddleware } from './utils/auth';

import db from './config/connection'

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

const corsOptions = {
  origin: process.env.ORIGIN || "https://al-haya.vercel.app"
  credentials: true,
}

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware,
  }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }
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