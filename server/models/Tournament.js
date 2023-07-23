const mongoose = require('mongoose')
var valid = require('validator');

const Schema = mongoose.Schema ;

const TournamentSchema = Schema({
  Name : {
    type : String ,
    required : true
  }
  ,
  Type : {
    type : String ,
    enum : ['normal' , 'crazy' ] ,
  }
  ,
  Time : {
    type : String ,
    enum : ['Rapid' , 'Blitz' , 'Classic'],
    required : true
  }
  ,
  Players : {
    type : [String] ,
    default : []
  }
  ,
  Description : String
  ,
  Max : {
    type : Number ,
    required : true 
  }
  ,
  StartsAt : {
    type : Date ,
    required : true 
  } 


})

module.exports = mongoose.model("Tournament" , TournamentSchema)