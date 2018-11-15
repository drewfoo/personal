//require mongoose
//need to create a new schema with the schema object and pass the object of keys/values from the value and make sure we get all the data

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const FeedbackSchema = new mongoose.Schema({
  createdDate: {
    type: Date,
  },
  summary: {
    type: String,
  },
  note: {
    type: String,
  }
});

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  favoriteBook: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  feedback: [FeedbackSchema]
});

//authenticate input against database documents
// statics allows you to add methods directly to the model; you can call authenticate later in the program
// Query document, then exec method to perform the search.
// then compare supplied verses whats in mongo

UserSchema.statics.authenticate = function(email, password, callback) {
  User.findOne({ email: email })
      .exec(function (error, user) {
        if (error) {
          return callback(error);
        } else if ( !user ) {
          var err = new Error('User not found.');
          err.status = 401;
          return callback(err);
        }
        bcrypt.compare(password, user.password , function(error, result) {
          if (result === true) {
            return callback(null, user);
          } else {
            return callback();
          }
        })
      });
}

// function to run just prior to sending it to Mongo; has password
// hook name 'save' mongoose keyword, before saving mongoose will run the anonymous function
// this var user is the current instance of the user submission
// 10 how many times to process the password
UserSchema.pre('save', function(next) {
  var user = this;
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

// need to export to use schema in repo, create new variable use model method and then it creates our schema.
var Feedback = mongoose.model('Feedback', FeedbackSchema);
var User = mongoose.model('User', UserSchema);
module.exports = Feedback;
module.exports = User;

