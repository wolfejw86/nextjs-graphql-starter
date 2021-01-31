import { gql } from 'apollo-server-micro';

export const user = gql`
  type User {
    id: ID!
    email: String!
  }

  extend type Query {
    user: User!
  }
`;
