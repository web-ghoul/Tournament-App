const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const TourNode = new Schema({
    tournamentID: String,
    gameID: String ,
    gameLink: String ,
    userName1: String,
    userName2: String,
    round: Number,
    createdAt: Date,
    nodeNumber: Number,
    winner:{
      type: String ,
      default: "*",
    }
})

const Node = mongoose.model("TourNodes", TourNode);

module.exports = Node;