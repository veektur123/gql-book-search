const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, arguments) => {
      return User.findById(arguments._id)
    }
  },
  Mutation: {
    addUser: async (parent, arguments) => {
      const user = await User.create(arguments);
      const jwt = signToken(user);
      return jwt;
    },
    login: async (parent, { password, email }) => {
      const user = await User.findOne({ email: email} );
      if (!user) {
      return console.log(`Unable to find user with email ${email}` );
    }
    
    const correctPw = await user.isCorrectPassword(password);

    if (!correctPw) {
      return console.log('Password is incorrect');
    }
    const jwt = signToken(user);
    
    return jwt;

    },
    removeBook: async (parent, {_id, bookId}) => {
        const upToDateUser = await User.findOneAndUpdate(
          { _id },
          { $pull: { savedBooks: { _id: bookId } } },
          { new: true }
        );
        if (!upToDateUser) {
          return { message: `User with id ${_id} not found` };
        }
        return upToDateUser;
      },
    saveBook: async (parent, {_id, book}) => {
    try {
      const upToDateUser = await User.findOneAndUpdate(
        { _id },
        { $addToSet: { savedBooks: book} },
        { new: true, runValidators: true }
      );
      return upToDateUser;
    } catch (err) {
      console.log(err);
      return err;
    }
    },
  },
};

module.exports = resolvers;