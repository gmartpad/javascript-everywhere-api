const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  AuthenticationError,
  ForbiddenError
} = require('apollo-server-express');
require('dotenv').config();
 
const gravatar = require('../util/gravatar');

module.exports = {
  newNote: async (parent, args, { models }) => {
    return models.Note.create({
      content: args.content,
      author: 'Adam Scott'
    })
  },
  updateNote: async (parent, args, { models }) => {
    return models.Note.findOneAndUpdate(
      { 
        _id: args.id
      }, 
      { 
        $set: {
          content: args.content
        } 
      }, 
      { 
        new: true 
      }
    );
  },
  deleteNote: async (parent, args, { models }) => {
    try {
      models.Note.findOneAndRemove({ _id: args.id });
      return true;
    } catch {
      return false;
    }
  },
  signUp: async (parent, { username, email, password }, { models }) => {
    // normalize email address
    const formattedEmail = email.trim().toLowerCase();
    // hash the password
    const hashed = await bcrypt.hash(password, 10);
    // create the gravatar url
    const avatar = gravatar(email);
    try {
      const user = await models.User.create({
        username, 
        email: formattedEmail,
        avatar,
        password: hashed
      });

      // create and return the json web token
      return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    } catch (err) {
      console.error(err);
      // if there's a problem creating the account, throw and error
      throw new Error('Error creating account');
    }
  },
  signIn: async (parent, { username, email, password }, { models }) => {
    if(email){
      // normalize email address
      email = email.trim().toLowerCase();
    }
    
    // find the user by email or username
    const user = await models.User.findOne({
      $or: [{ email }, { username }]
    });

    // if no user is found, throw and authentication error
    if(!user){
      throw new AuthenticationError('Error signing in - User not found');
    }

    // if the password don't match, throw an authentication error
    const valid = await bcrypt.compare(password, user.password);
    if(!valid){
      throw new AuthenticationError('Error signing in - Incorrect Password');
    }
    
    // create and return the json web token
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  }
}