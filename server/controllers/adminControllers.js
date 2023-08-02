const User = require("../models/UserSchema");
const Tournament = require("../models/Tournament");
const Node = require("../models/TourNode");

const addAdmin = (req, res, nxt) => {
  if (req.role == "Admin") {
    const name = req.body.username;

    User.findOneAndUpdate({ Name: name }, { role: "Admin" }, { new: true })
      .then((result) => {
        console.log(result);
        if (result) {
          res.status(200).json({
            message: "Admin Added !!",
          });
        } else {
          res.status(404).json({
            message: "user not found !",
          });
        }
      })
      .catch((err) => {
        res.status(404).json({
          message: err,
        });
      });
  } else {
    res.status(403).json({
      message: "Unauthorized user ! ",
    });
  }
};

const addTournament = async (req, res, nxt) => {
  if (req.role == "Admin" || req.role == "User") {
    const { name, type, game_time, max, description, startsAt } =
      req.body;

    try {
      const checktournament = await Tournament.find({
        $and: [{ Name: name }, { Finished: false }],
      });
      //console.log("asdfasdf")
      //  console.log(checktournament)
      if (checktournament.length > 0) {
        console.log(checktournament);
        return res.status(403).json({
          message: "This name is already used !",
        });
      }
    } catch (err) {
      res.status(403).json({
        message: "Failed !",
      });
    }

    const Tourn = new Tournament({
      Name: name,
      Type : type ,
      Time: game_time,
      Max: +max,
      Description: description,
      StartsAt: startsAt,
      Creator: req.userName,
    
    });
    Tourn.save()
      .then((result) => {
        console.log(result)
        res.status(200).json({
          message: "Tournament Added!",
          //inviteLink: `http://localhost:3000/JoinTournament/${result._id}`
        });
      })
      .catch((err) => {
        res.status(404).json({
          message: err,
        });
      });
  } else {
    res.status(403).json({
      message: "Unauthorized user!",
    });
  }
};

const deleteTournament = async (req, res, next) => {
  
    const id = req.params.id;
    const data = await Tournament.find({_id : req.userId})
    if(data.Creator == req.userName ||req.role == "Admin" )
    {

    await Tournament.findByIdAndDelete({ _id: id })
      .then(async (result1) => {
        if (result1) {
          //console.log("Tournament deleted:", result1);

          await Node.deleteMany({ tournamentID: id })
            .then((result) => {
              res.status(202).json({
                //data: result1,
                message: "Tournament deleted.",
              });
            })
            .catch((err) => {
              res.status(404).json({
                message: err,
              });
            });
        } else {
          //console.log("Tournament not found.");
          res.status(404).json({
            message: "Tournament not found.",
          });
        }
      })
      .catch((err) => {
        res.status(404).json({
          message: err,
        });
      });
    }
   else {
    res.status(401).json({
      message: "FLAG{THE_EAZY_FLAG}",
    });
  }
};

module.exports = { addAdmin, addTournament, deleteTournament };
