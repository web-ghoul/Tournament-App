const User = require("../models/UserSchema");
const Tournament = require("../models/Tournament");

const joinTournament = async (req, res, next) => {
  const tournamentId = req.params.id;
  const userName = req.userName;

  try {
    const tournament = await Tournament.findOne({ _id: tournamentId });

    if (tournament.Players.includes(userName)) {
      return res.status(200).json({
        message: "User already joined the tournament"
      });
    }

  } catch (err) {
    return res.status(404).json({
      message: err.message
    });
  }

    Tournament.findOneAndUpdate(
      { _id: tournamentId },
      { $push: { Players: req.userName } },
      { new: true }
    ).then((result) => {
      res.status(200).json({
        message: "User added to the tournament"
      });
    }
    ).catch((err) => {
      res.status(404).json({
        message: err
      });
    }
    );

    
  
};

const EnterTournament = (req, res, next) => {
  const tournamentId = req.params.id;

  Tournament.findOne({ _id: tournamentId }).then((result) => {
    console.log(result);
    //checking if the user registered for this tournament
    if (result.Players.includes(req.userName)) {
      const tournamentTime = result.StartsAt;
      //checking time
      console.log(tournamentTime)
        console.log(Date.now())
      if (tournamentTime < Date.now()) {
        //res.redirect("/Bracket/:Tourid")
        
        res.status(200);
        next() ;
      } else {
        res.status(404).json({
          message : "Not yet ! "
        });
      }
    } else {
      res.status(404).json({
        message : "Sorry you didnt Join the tournament ! "
      });
      
    }
  }).catch((err) => {
    res.status(404).json({
      message : err
    });
  }
  );
};





module.exports = {EnterTournament , joinTournament}