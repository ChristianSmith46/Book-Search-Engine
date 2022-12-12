import { gql } from '@apollo/client';

// Login user mutation that return token for auth and user id and username
export const LOGIN_USER = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

// Add user to db and return token for auth and user id and username
export const ADD_USER = gql`
    mutation AddUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

// Save book to users saved books and return the user id and saved book ids
export const SAVE_BOOK = gql`
    mutation SaveBook($book: BookInput!) {
        saveBook(book: $book) {
            _id
            savedBooks {
                bookId
            }
        }
    }
`;

// Remove book mutation that returns the users data and savedbooks to update user after removing a book
export const REMOVE_BOOK = gql`
    mutation RemoveBook($bookId: String!) {
        removeBook(bookId: $bookId) {
            _id
            username
            bookCount
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;