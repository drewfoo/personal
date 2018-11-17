const mongoose = require('mongoose');

const PlayerSchema = new mongoose.SchemaType({
  team: {
    type: String
  },
  name: {
    type: String
  },
  summary: {
    type: String
  },
  detail: {
    type: String
  },
  responsibilities: {
    type: String
  },
  position: {
    type: String
  },
});

const Player = mongoose.model('Player', PlayerSchema);
module.exports = Player;
