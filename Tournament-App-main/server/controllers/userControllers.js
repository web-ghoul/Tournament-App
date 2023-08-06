const User = require("../models/UserSchema");
const Tournament = require("../models/Tournament");

const joinTournament = async (req, res, next) => {
  const tournamentId = req.params.id;
  const userName = req.userName;
  try {
    const tournament = await Tournament.findOne({ _id: tournamentId });
    if (tournament.Players.includes(userName)) {
      return res.status(200).json({
        message: "You Joined Already",
        players_num: tournament.Players.length,
      });
    }
    if (tournament.Max == tournament.Players.length) {
      return res.status(200).json({
        message: "Tournament is Full !",
        players_num: tournament.Players.length,
      });
    }
    if (tournament.StartsAt < Date.now()) {
      return res.status(403).json({
        message: "Tournament is Closed!",
        players_num: tournament.Players.length,
      });
    }
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    });
  }
  Tournament.findOneAndUpdate(
    { _id: tournamentId },
    { $push: { Players: req.userName } },
    { new: true }
  )
    .then((result) => {
      res.status(200).json({
        message: "You are Joined Successfully",
        players_num: result.Players.length,
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: err,
      });
    });
};

const EnterTournament = (req, res, next) => {
  const tournamentId = req.params.id;

  Tournament.findOne({ _id: tournamentId })
    .then((result) => {
      console.log(result);
      //checking if the user registered for this tournament
      const tournamentTime = result.StartsAt;
      //checking time
      // tournamentTime < Date.now()
      if (tournamentTime < Date.now()) {
        //res.redirect("/Bracket/:Tourid")
        if (result.Type == "Points") {
          if (result.Players.length % 2 == 0) {
            return next();
          } else {
            res.status(404).json({
              message: "Number of Players is not allowed",
            });
          }
        }
        var check = Math.log2(result.Players.length);
        console.log(check);
        if (Number.isInteger(check)) {
          next();
        } else {
          res.status(404).json({
            message: "Number of Players is not allowed",
          });
        }
      } else {
        res.status(404).json({
          message: `Tournament is not started yet`,
        });
      }
    })
    .catch((err) => {
      res.status(404).json({
        message: err,
      });
    });
};

const finishedTutorial = (req, res, next) => {
  const id = req.userId;
  User.findOneAndUpdate({ _id: id }, { tutorial: false }, { new: true })
    .then((result) => {
      res.status(200).json({
        message: "Tutorial finished successfully !",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { EnterTournament, joinTournament, finishedTutorial };
