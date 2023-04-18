import { gql } from '@apollo/client';

export const GET_ME = gql`
query Query($id: ID!) {
  me(_id: $id) {
    _id
    email
    password
    username
    savedBooks {
      title
      _id
      description
      bookId
      authors
      image
      link
    }
  }
}
`;
