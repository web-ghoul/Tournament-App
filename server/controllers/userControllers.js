const User = require("../models/UserSchema");
const Tournament = require("../models/Tournament");

const joinTournament = (req, res, next) => {
  const tournamentId = req.params.id;

  Tournament.findOneAndUpdate(
    { _id: tournamentId },
    { $push: { Players: req.userName } },
    { new: true }
  )
    .then((result) => {
      console.log(result);
      res.send("user added")
    })
    .catch((err) => {
      console.log(err);
      res.send(err)
    });
};

const EnterTournament = (req, res, next) => {
  const tournamentId = req.params.id;

  Tournament.findOne({ _id: tournamentId }).then((result) => {
    console.log(result);
    //checking if the user registered for this tournament
    if (result.Players.includes(req.userName)) {
      const tournamentTime = result.Time;
      //checking time
      if (tournamentTime > Date.now()) {
        //res.redirect("/Bracket/:Tourid")
        res.send("tournament bracket");
      } else {
        res.send("Not yet");
      }
    } else {
      res.send("Sorry you didnt Join the tournament ! ");
    }
  });
};





module.exports = {EnterTournament , joinTournament}