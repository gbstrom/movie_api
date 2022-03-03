/**
 * @fileoverview This file implements schemas for documents held in the movies and users collections in
 * MongoDB. Then models created according to these schemas are used in http requests to API endpoints to 
 * create, read, update and delete documents from the database. Mongoose is connected to the database 
 * using the connect method in index.js.
 * @requires mongoose The mongoose model connects the app to MongoDB and implements data schemas using models.
 * @requires bcrypt The bcrypt model implements encryption on user passwords.
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/** This is the schema for the movies collection */
let movieSchema = mongoose.Schema({
  Title: {type: String, required: true},
  Description: {type: String, required: true},
  Genre: {
    Name: String,
    Description: String
  },
  Director: {
    Name: String,
    Bio: String
  },
  Actors: [String],
  ImagePath: String,
  Featured: Boolean
});

/** This is the schema for the users collection */
let userSchema = mongoose.Schema({
  Username: {type: String, required: true},
  Password: {type: String, required: true},
  Email: {type: String, required: true},
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

/**
 * This is a static method for encrypting user passwords used when creating or updating users. 
 * It is available to each instance of a user.
 * @method hashPassword
 * @param {*} password - The user's password taken from the request body.
 * @returns {string} String containing the encrypted password.
 */
userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

/**
 * This is a custom method used to validate a user's password against the encrypted version in MongoDB
 * when the user attempts to log in. It is available to each instance of a user.
 * @method validatePassword
 * @param {*} password - Password submitted by the user when logging in.
 * @returns {boolean} This value is true if the password submitted after encryption matches the encrypted password
 * found in MongoDB. 
 */
userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.Password);
};

/** This creates a model for the movies database collection using the movieSchema */
let Movie = mongoose.model('Movie', movieSchema);
/** This creates a model for the users database collection using the userSchema */
let User = mongoose.model('User', userSchema);

/** This exports the Movie and User models for use elsewhere in the application */
module.exports.Movie = Movie;
module.exports.User = User;

// Note to self: add a serialization method to this code some day.