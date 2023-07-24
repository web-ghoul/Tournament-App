const User = require("../models/UserSchema");
const Tournament = require("../models/Tournament");

const addAdmin = (req, res, nxt) => {
  if (req.role == "Admin") {
    const name = req.body.username;

    User.findOneAndUpdate({ Name: name }, { role: "Admin" }, { new: true })
      .then((result) => {
        console.log(result);
        if (result)
        {
          res.status(200).json({
            message : "Admin Added !!"
          })
        } 
        else
        {
          res.status(404).json({
            error : "user not found !" 
          })
        }
      })
      .catch((err) => {
        res.status(404).json({
          error : err 
        })
      });
  } else {
    res.status(403).json({
      error : "Unauthorized user ! "
    })
  }
};

const addTournament = (req, res, nxt) => {
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
        res.status(200).json({
          message : "Tournament Added!"
        })
      })
      .catch((err) => {
        res.status(404).json({
          error : err 
        })
      });
  } else {
    res.status(403).json({
      message : "Unauthorized user!"
    })
  }
};

module.exports = { addAdmin, addTournament };
