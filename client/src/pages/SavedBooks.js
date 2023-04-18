import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import {GET_ME} from '../utils/queries';
import {REMOVE_BOOK} from '../utils/mutations'
import {useQuery, useMutation} from '@apollo/client';

import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  const [removeBook] = useMutation(REMOVE_BOOK);
  
  const {data: profile} = Auth.loggedIn() ? Auth.getProfile() : null;

  const { loading, error, data } = useQuery(GET_ME, {variables: {id: profile._id}});

  if (loading) return "Loading...";

  if (error) return `Error! ${error.message}`;

  let userData = data.me
  
  console.log(userData)

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    if (!profile) {
      return false;
    }

    try {
      const {data} = await removeBook({variables:{id: profile._id, bookId: bookId}});

      if (!data) {
        throw new Error('something went wrong!');
      }
      userData = data.me
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
