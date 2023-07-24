const Node = require("../models/TourNode");
const Tournament = require("../models/Tournament");
const lodash = require("lodash");
const axios = require("axios");

const displayNodes = async(req, res, next) => {
  const tournament_Id = req.params.id;
  await Node.find({ tournamentID: tournament_Id })
    .then(async (result) => {
      console.log(result)
      if (result.length !== 0) {
        res.status(200).json({
          data: result,
        });
      } else {
        let data = [];
        await Tournament.findOne({ _id: tournament_Id })
          .then(async (result) => {
          console.log(result)
            if (result) {
              let arr = lodash.shuffle(result.Players);
              let j = 1;
              for (let i = 0; i < arr.length; i += 2) {
                let formData = new URLSearchParams();
                formData.append("clock.limit", 900);
                formData.append("users", `${arr[i]},${arr[i + 1]}`);
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
                

                  let temp = new Node({
                    tournamentID: tournament_Id,
                    gameID: response.data.challenge.id,
                    gameLink: response.data.challenge.url,
                    userName1: arr[i],
                    userName2: arr[i + 1],
                    round: 1,
                    createdAt: Date.now(),
                    nodeNumber: j,
                  });
                  
                  try{
                  await temp.save()
                  }catch(error)
                  {
                    console.log(error)
                  }
                  data.push(temp);
                  j++;
                }catch(error)
                {
                  console.log(error)
                  res.json(error)
                }
                
              }
              res.status(200).json({
                data: data,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const gameEnds = async (req, res, next) => {
  //console.log(req.params);
  const game_Id = req.params.game_id;
  const node_Id = req.params.node_id;
  try {
    const response = await axios.get(
      `https://lichess.org/game/export/${game_Id}`,
      {
        headers: {
          "accept": "application/json",
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

    if (response.data.hasOwnProperty("winner")) {
      console.log("done");
      
      let winner = response.data.winner ;
      let winnerName = response.data.players[winner].user.name ;
      
      await Node.findOne({ _id: node_Id })
      .populate("tournamentID")
        .then(async(result1) => {
          console.log(result1);
          if (result1) {
            var number = result1.nodeNumber;
            var first = false ; 
            if (result1.nodeNumber % 2 == 0) {
              number = parseInt(number/2);
            }else{
              number = parseInt(number/2) + 1;
              first = true ;
            }

            result1.winner = winnerName
            try
            {
              let saveresult = await result1.save()
            }catch(error)
            {
              console.log(error)
            }
            await Node.findOne({ $and: [{ nodeNumber: number }, { round: result1.round + 1 } , {tournamentID : result1.tournamentID._id}] , })
              .then(async (result) => {
                
                if (result) {
                  let formData = new URLSearchParams();
                  formData.append("clock.limit", 900);
                  if(first)
                  {
                    formData.append(
                      "users",
                      `${result.userName2},${winnerName}`
                    );
                  }else
                  {
                    formData.append(
                      "users",
                      `${result.userName1},${winnerName}`
                    );
                  }
                  
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
                    if(first)
                    {
                      result.userName1 = winnerName;
                    }else
                    {
                      result.userName2 = winnerName;
                    }
                    result.gameID = response.data.challenge.id;
                    result.gameLink = response.data.challenge.url;
                    try{
                      await result.save()
                      console.log("Hello")
                      req.params.id = result1.tournamentID;
                      next()
                    }catch(error)
                    {
                      console.log(error)
                    }
                  } catch (error) {
                    console.log(error);
                  }
                } else {
                  if(first)
                  {
                    var temp = new Node({
                    tournamentID: result1.tournamentID,
                    userName1: winnerName,
                    round: result1.round + 1,
                    createdAt: Date.now(),
                    nodeNumber: number,
                  });
                }else{
                    var temp = new Node({
                      tournamentID: result1.tournamentID,
                      userName2: winnerName,
                      round: result1.round + 1,
                      createdAt: Date.now(),
                      nodeNumber: number,
                    });
                  }
                  try{await temp
                    .save()
                    .then((result) => {
                      console.log("Node saved ! ");
                      req.params.id = result1.tournamentID;
                      next()
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                  }catch(err){
                    console.log(err)
                  }
                  
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("the game is not finished yet !!");
      res.status(404).json({
        message: "the game is not finished yet!!",
      });
    }
  } catch (err) {
    console.log(err);
    res.json(err)
  }
};

const displayTournaments = (req,res,next) => {
  Tournament.find()
  .then((result) => {
    if(result)
    {
      res.status(200).json({
        data : result
      })
    }
    else
    {
      res.status(200).json({
        data : []
      })
    }
  }
  )
  .catch((err) => {
    res.status(404).json({
      message : err
    })
  }
  )
}


module.exports = { displayNodes , gameEnds ,  displayTournaments};