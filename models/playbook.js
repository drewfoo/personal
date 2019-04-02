const mongoose = require('mongoose');
const Player = require('../models/player');
const Play = require('../models/play');
var ObjectId = mongoose.Schema.Types.ObjectId;

const FaqSchema = new mongoose.Schema({
  question: {
    type : String
  },
  answer: {
    type : String
  },
});

const SectionSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  header: {
    type: String,
  },
  body: {
    type: String,
  },
  img: {
    type: String,
  },
  references: [String],
  list: [String],
  faq : [FaqSchema]
});

const PlaybookSchema = new mongoose.Schema({
  key : {
    type: String
  },
  name: {
    type: String
  },
  heading: {
    type: String
  },
  summary: {
    type: String
  },
  section: [SectionSchema],
  plays: [ { type : ObjectId, ref: 'Play' } ]
  // players: [ { type : ObjectId, ref: 'Player'} ]
});

const Faq = mongoose.model('Faq', FaqSchema);
const Section = mongoose.model('Section', SectionSchema);
const Playbook = mongoose.model('Playbook', PlaybookSchema);
module.exports = Faq;
module.exports = Section;
module.exports = Playbook;
