const Node = require("../models/PointsTournamentNode");
const Tournament = require("../models/Tournament");
const FinishedTournament = require("../models/FinishedTournament");
//const lodash = require("lodash");
const axios = require("axios");

var timeValue = new Map();

timeValue.set("Rapid", 600);
timeValue.set("Blitz", 300);
timeValue.set("Classic", 1800);

const displayNodes = async (req, res, next) => {
  const tournament_Id = req.params.id;
  console.log("result");
  await Node.find({ tournamentID: tournament_Id })
    .populate("tournamentID")
    .then(async (result) => {
      
      if (result.length !== 0) {
        return res.status(200).json({
          data: result,
        });
      } else {
        var data = [];
        await Tournament.findOne({ _id: tournament_Id })
          .then(async (result) => {
            //console.log(result);
            if (result) {
              var arr = result.Players;
              for (var i = 0; i < arr.length; i++) {
                var matches = [];
                var k = 1 ;
                for (var j = 0; j < arr.length; j++) {
                  if (i == j) continue;

                  console.log("data[j]")
                  
                  if(j < i)
                  {
                    console.log(data[j])
                    var temp ={
                      Player: arr[j],
                      gameID: data[j].Matches[i-1].gameID,
                      gameLink: data[j].Matches[i-1].gameLink,
                      round: k,
                    };
                    
  
                  }
                  else
                  {
                  let formData = new URLSearchParams();
                  var nodeTime = timeValue.get(result.Time);
                  formData.append("clock.limit", nodeTime);
                  formData.append("users", `${arr[i]},${arr[j]}`);
                  formData.append("clock.increment", 0);

                  try {
                    let response = await axios.post(
                      "https://lichess.org/api/challenge/open",
                      formData,
                      {
                        headers: {
                          "Content-Type": "application/x-www-form-urlencoded",
                        },
                      }
                    );
  
                    var temp ={
                      Player: arr[j],
                      gameID: response.data.challenge.id,
                      gameLink: response.data.challenge.url,
                      round: k,
                    };
                  } catch (error) {
                    console.log(error);
                    res.json(error);
                  }
                }

                    matches.push(temp);
                    k++;
                

                }

                var playerMatches = new Node({
                  Name : arr[i],
                  tournamentID : tournament_Id,
                  Matches: matches,
                })
                try
                {
                  await playerMatches.save()
                } catch(err)
                {
                  console.log(err);
                }

                data.push(playerMatches);
              }
              
              return res.status(200).json({
                data: data,
              });

            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
};

const gameEnds = async(req,res,next) => {
  const game_Id = req.params.game_Id;
  console.log(game_Id)
  console.log(req.forfree)

  try {
    
    if(req.hasOwnProperty("forfree"))
    {
      var winnerName = req.forfree ;
      var response = {data:
        {}
      };
    }else
    {
    var response = await axios.get(
      `https://lichess.org/game/export/${game_Id}`,
      {
        headers: {
          accept: "application/json",
        },
      }
    );
  
    //console.log(response.data);
    if (response.status === 200) {
      console.log("Request successful");
      // Handle successful response
    } else {
      console.log("Request failed with status:", response.status);
      // Handle other statuses
    }

    if (response.data.hasOwnProperty("winner") || response.data.status == 'draw') {
      
      if(response.data.status != 'draw')
      {
        var winner = response.data.winner;
        var winnerName = response.data.players[winner].user.name;
      }
    } else {
      //console.log("the game is not finished yet !!");
      res.status(404).json({
        message: "the game is not finished",
      });
    }
  }
      const data = await Node.find({
        Matches: { $elemMatch: { gameID: game_Id } }, // Matches the specified element in the Matches array
      }).populate("tournamentID");
      console.log(game_Id)
      console.log(data)
      var roundNumber = (Math.floor(data[0].tournamentID.FinishedMatches/data[0].tournamentID.Players.length))+1 ;
      
      if(response.data.hasOwnProperty("status") && response.data.status == 'draw')
      {
        data[0].Matches[roundNumber-1].winner = "draw"
        data[0].Points += 1
        data[1].Matches[roundNumber-1].winner = "draw"
        data[1].Points += 1
        

      }else
      {
        if(data[0].Name == winnerName)
        {
          data[0].Matches[roundNumber-1].winner = winnerName
          data[0].Points += 2
          data[1].Matches[roundNumber-1].winner = winnerName
        }else
        {
          data[1].Matches[roundNumber-1].winner = winnerName
          data[1].Points += 2
          data[0].Matches[roundNumber-1].winner = winnerName
        }
        
      }
      data[0].tournamentID.FinishedMatches += 1 ;
      if(roundNumber == data[0].tournamentID.Players.length-1)
      {
        data[0].tournamentID.Winner =  winnerName;
      }
      await data[0].tournamentID.save();
      const promises = data.map((document) => document.save());
        await Promise.all(promises);
      
      
      req.params.id = data[0].tournamentID;
      next();



    
  

  } catch (err) {
    console.log(err);
    res.status(404).json({
      message : "game is not started yet",
      error : err
    });
  }
}

const abortMatch = async (req,res,next) => {

  const user = req.userName;
  const game_Id = req.params.game_Id;
  console.log(game_Id)
  const timeNow = Date.now();

  await Node.find({
    Matches: { $elemMatch: { gameID: game_Id } },
  }).populate("tournamentID")
  .then((result) => {
    const round = (Math.floor(result[0].tournamentID.FinishedMatches/result[0].tournamentID.Players.length))+1 ;
    if(!result[0].Matches[round-1].hasOwnProperty("secondUserEntered") && result[0].Matches[round-1].firstUserEntered.User == user)
    {
      
      var timeDifferenceMs  = result[0].Matches[round-1].firstUserEntered.Time.getTime() - timeNow ;
      console.log((Math.abs(timeDifferenceMs / (1000 * 60)) ))
      if(Math.abs(timeDifferenceMs / (1000 * 60)) > 10 )
      {

        req.forfree = user;
        console.log(user)
        return next();
        
      }
        
      
  

    
    
  }

  return res.status(402).json({
    message : `Can't abort this match till ${10-Math.ceil(Math.abs(timeDifferenceMs / (1000 * 60)))} min!`
  })
}
  )
}


const savingEntry = async(req,res,next) => {

  const user = req.userName;
  const game_Id = req.params.game_Id;
  
  
  await Node.find({
    Matches: { $elemMatch: { gameID: game_Id } },
  }).populate("tournamentID").populate("Matches")
  .then(async(result) => {
    console.log(result)
    const round = (Math.floor(result[0].tournamentID.FinishedMatches/result[0].tournamentID.Players.length))+1 ;
    const timeNow = Date.now();
    const data = {
      User : user ,
      Time : timeNow
    }
    console.log(round)
    console.log(result[0].Matches[0])
    if(!result[0].Matches[round-1].hasOwnProperty("firstUserEntered"))
    {
      result[0].Matches[round-1].firstUserEntered = data ;
      result[1].Matches[round-1].firstUserEntered = data ;
    }else if(!result[0].Matches[round-1].hasOwnProperty("secondUserEntered"))
    {
      result[0].Matches[round-1].secondUserEntered = data ;
      result[1].Matches[round-1].secondUserEntered = data ;
    }



    const promises = result.map((document) => document.save());
    await Promise.all(promises);

    res.status(200).json({
      message : "User entered match successfully !"
    })
    
  }
  ).catch((err) => {
    console.log(err)
  }
  )

  
}


module.exports = { displayNodes , gameEnds , savingEntry , abortMatch};
