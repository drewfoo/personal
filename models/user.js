//require mongoose
//need to create a new schema with the schema object and pass the object of keys/values from the value and make sure we get all the data

var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
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
    }
});

// need to export to use schema in repo, create new variable use model method and then it creates our schema.
var User = mongoose.model('User', UserSchema);
module.exports = User;
