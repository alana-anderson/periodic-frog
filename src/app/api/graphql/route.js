import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import mysql from 'mysql2/promise';
import { gql } from 'graphql-tag';

// TODO: Figure out why I can't use next.config.js to import these
const DATABASE_HOST = process.env.DATABASE_HOST;
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_NAME = process.env.DATABASE_NAME;

const typeDefs = gql`
  type User {
    name: String!
    email: String!
    username: String!
  }

  type Message {
    id: ID!
    message: String!
  }

  type Query {
    messages: [Message!]!
    userProfile(username: String!): User
  }
`;

const resolvers = {
  Query: {
    messages: async () => {
      // Existing code for fetching messages
    },
    userProfile: async (_, { username }) => {
      // Code to fetch user profile by username
      const connection = await mysql.createConnection({
        host: DATABASE_HOST,
        user: DATABASE_USER,
        database: DATABASE_NAME,
        password: DATABASE_PASSWORD,
      });

      const [rows] = await connection.execute('SELECT * FROM `User` WHERE `username` = ?', [username]);

      await connection.end();
      
      return rows[0];
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// This might be different depending on the actual usage of the @as-integrations/next library
const handler = startServerAndCreateNextHandler(server);

export async function GET(request) {
  return handler(request);
}

export async function POST(request) {
  return handler(request);
}
