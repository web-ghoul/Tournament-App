const User = require("../models/UserSchema");
const Tournament = require("../models/Tournament");
const Node = require("../models/TourNode");
const tournamentControllers = require("../controllers/tournamentControllers")
const PointstournamentControllers = require("../controllers/pointsTournamentControllers")
const cron = require('node-cron');


const addAdmin = (req, res, next) => {
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

const addTournament = async (req, res, next) => {
  if (req.role == "Admin" || req.role == "User") {
    const { name, type, game_time, max, description, startsAt } =
      req.body;

    try {
      const checktournament = await Tournament.find({
        $and: [{ Name: name }, { Winner: "*" }],
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
        var targetDateTime = result.StartsAt; // Assuming result.StartsAt is a valid ISO 8601 timestamp
        //var date = timestamp.split('.')[0];
        
        // Schedule a task to run once at a specific date and time
      //  const targetDateTime = new Date(date); // Replace with your desired date and time

        const minute = targetDateTime.getMinutes();
        const hour = targetDateTime.getHours();
        const dayOfMonth = targetDateTime.getDate();
        const month = targetDateTime.getMonth() + 1; // Months are zero-based, so add 1
        const year = targetDateTime.getFullYear();
        console.log(year, month, dayOfMonth , hour , minute)
        const cronPattern = `${minute-2} ${hour} ${dayOfMonth} ${month} *`; // Schedule for a specific date and month

        cron.schedule(cronPattern, () => {
          console.log(new Date() )
          console.log('Scheduled task executed at the specified date and time.');
          req.params.id = result._id;
          if(result.Type == "Brackets")
          {
            tournamentControllers.displayNodes(req,res,next)
          }
          else
          {
            PointstournamentControllers.displayNodes(req,res,next)
          }
          
          // Call your function or perform your task here
        });
  
        return res.status(200).json({
          message: "Tournament Added!",
          //inviteLink: `http://localhost:3000/JoinTournament/${result._id}`
        });
      })
      .catch((err) => {
        console.log(err)
        res.status(404).json({
          message: err.message,
          
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
    //console.log(req)
    const data = await Tournament.findOne({_id : id})
    //console.log(data , req.role)
    if(data.Creator == req.userName || req.role == "Admin" )
    {

    await Tournament.findByIdAndDelete({ _id: id })
      .then(async (result1) => {
        if (result1) {
          //console.log("Tournament deleted:", result1);

          await Node.deleteMany({ tournamentID: id })
            .then((result) => {
              if(req.message)
              {
              console.log("hello")
              }else{
              res.status(202).json({
                //data: result1,
                message: "Tournament deleted.",
              });
            }
            })
            .catch((err) => {
              res.status(404).json({
                message: "err",
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
    }else {
    res.status(401).json({
      message: "FLAG{THE_EAZY_FLAG}" ,
    });
  }
};

module.exports = { addAdmin, addTournament, deleteTournament };
