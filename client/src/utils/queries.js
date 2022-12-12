import { gql } from '@apollo/client';

// Query for current user.  Used to get the saved books and display later
export const GET_ME = gql`
    query Me {
        me {
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