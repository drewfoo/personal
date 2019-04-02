const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const PlayerSchema = new mongoose.Schema({
  _id: ObjectId,
  name: {
    type: String,
  },
  team: {
    type: String,
  },
  summary: {
    type: String,
  },
  detail: {
    type: String,
  },
  position: {
    type: String,
  },
  responsibilities: {
    type: String,
  }
});

const Player = mongoose.model('Player', PlayerSchema);
module.exports = Player;