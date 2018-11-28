const mongoose = require('mongoose');

const DetailSchema = new mongoose.Schema({
  section: {
    type: String,
  },
  content: {
    type: String,
  }
});

const PlaySchema = new mongoose.Schema({
  name: {
    type: String
  },
  heading: {
    type: String
  },
  summary: {
    type: String
  },
  detail: [DetailSchema]
});

const Detail = mongoose.model('Detail', DetailSchema);
const Play = mongoose.model('Play', PlaySchema);
module.exports = Detail;
module.exports = Play;
