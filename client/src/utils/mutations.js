import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation AddUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password){
    token
    user {
      _id
      password
      username
      email
      savedBooks {
        _id
        bookId
        description
        authors
        title
        image
        link
      }
      bookCount
    }
  }
}
      
`;

export const REMOVE_BOOK = gql`
mutation RemoveBook($id: ID!, $bookId: ID!) {
    removeBook(_id: $id, bookId: $bookId) {
      username
      savedBooks {
        title
      }
    }
  }
`;

export const LOGIN_USER = gql`
mutation LoginUser($email: String, $password: String) {
  login(email: $email, password: $password){
    token
    user {
      _id
      password
      username
      email
      savedBooks {
        _id
        bookId
        description
        authors
        title
        image
        link
      }
      bookCount
    }
  }
}
`;

export const SAVE_BOOK = gql`
mutation SaveBook($id: ID!, $book: inputBook) {
  saveBook(_id: $id, book: $book) {
    _id
    email
    password
    username
    savedBooks {
      _id
      authors
      description
      bookId
      image
      link
      title
    }
  }
}
`;
