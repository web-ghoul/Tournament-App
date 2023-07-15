const User = require("../models/UserSchema");
const Tournament = require("../models/Tournament");

const addAdmin = (req, res, next) => {
  if (req.role == "Admin") {
    const name = req.body.username;
    User.findOneAndUpdate({ Name: name }, { role: "Admin" }, { new: true })
      .then((result) => {
        if (result) res.status(200).json({message:"admin Added"});
        else res.status(404).json({message:"user not found !"});
      })
      .catch((err) => {
        res.status(403).json({message:err});
      });
  } else {
    res.status(403).json({message:"You are not authorized"});
  }
};
 
const addTournament = (req, res, next) => { 
  if (req.role == "Admin") {
    const { name, type, game_time, max, description, startsAt } = req.body;
    const Tourn = new Tournament({
      Name: name,
      Time: game_time,
      Max: +max,
      Description: description,
      StartsAt: startsAt,
    });
    Tourn.save()
      .then((result) => {
        res.status(200).json({message:"Tournament added Successfully!!"});
      })
      .catch((err) => {
        console.log(err)
        res.status(403).json({message:"Error"});
      });
  } else {
    res.status(403).json({message:"You are not authorized"});
  }
};

module.exports = { addAdmin, addTournament };
