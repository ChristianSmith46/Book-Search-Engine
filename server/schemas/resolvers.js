const { User } = require("../models")
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        // Get user by context and return data
        me: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findOne({ _id: context.user._id });
                return user;
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    },

    Mutation: {
        // Check user email and password to login and return token for auth and user
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user with this email found!');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect password!');
            }

            const token = signToken(user);
            return { token, user };
        },
        // Add user to the db using username email password then return token for auth and user
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });

            const token = signToken(user);
            return { token, user };
        },
        // Save a book to users saved books and return the user
        saveBook: async (parent, { book }, context) => {
            if (context.user) {
                const user = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    {
                        $addToSet: { savedBooks: book }
                    },
                    {
                        new: true,
                        runValidators: true
                    }
                );
                return user;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        // Remove a book from users saved books and return user
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const user = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    {
                        $pull: { savedBooks: { bookId } }
                    },
                    { new: true }
                );
                return user;
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    }
}

module.exports = resolvers;