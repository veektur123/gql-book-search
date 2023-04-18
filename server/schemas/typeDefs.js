const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    _id: ID
    bookId: String
    description: String
    authors: [String]
    title: String
    image: String
    link: String
  }
  input inputBook {
    _id: ID
    bookId: String
    description: String
    authors: [String]
    title: String
    image: String
    link: String
  }

  type User {
    _id: ID
    password: String
    username: String
    email: String
    savedBooks: [Book]
    bookCount: Int
  }

  type Auth {
    token: String
    user: User
  }

  type Query {
    me(_id: ID!): User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String, password: String): Auth
    saveBook(_id: ID, book: inputBook): User
    removeBook(_id: ID, bookId: ID): User
  }
`;

module.exports = typeDefs;