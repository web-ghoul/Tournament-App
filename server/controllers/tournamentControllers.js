const Node = require("../models/TourNode");
const Tournament = require("../models/Tournament");
const lodash = require("lodash");
const axios = require("axios");

const displayTour = (req, res, next) => {
  const tournament_Id = req.params.id;

  Node.find({ tournamentID: tournament_Id })
    .then((result) => {
      if (result.length !== 0) {
       console.log("fuck")
        
        res.status(200).json({
          data: result,
        });
      } else {
        let data = [];
        Tournament.findOne({ _id: tournament_Id })
          .then(async (result) => {
          //console.log("temp")
            if (result) {
            //  console.log("temp")
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
      
      Node.findOne({ _id: node_Id })
        .then(async(result1) => {
          if (result1) {
            let number = result1.nodeNumber;
            if (result1.nodeNumber % 2 == 0) {
              number = parseInt(number/2);
            }else{
              number = parseInt(number/2) + 1;
            }

            result1.winner = winnerName
            try
            {
              let saveresult = await result1.save()
            }catch(error)
            {
              console.log(error)
            }
            Node.findOne({ $and: [{ nodeNumber: number }, { round: result1.round + 1 }] })
              .then(async (result) => {
                if (result) {
                  let formData = new URLSearchParams();
                  formData.append("clock.limit", 900);
                  formData.append(
                    "users",
                    `${result.userName1},${winnerName}`
                  );
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

                    result.userName2 = winnerName;
                    result.gameID = response.data.challenge.id;
                    result.gameLink = response.data.challenge.url;
                    try{
                    await result.save()
                    }catch(error)
                    {
                      console.log(error)
                    }
                    
                  } catch (error) {
                    console.log(error);
                  }
                  
                  
                } else {
                  let temp = new Node({
                    tournamentID: result1.tournamentID,
                    userName1: winnerName,
                    round: result1.round + 1,
                    createdAt: Date.now(),
                    nodeNumber: number,
                    
                  });
                  temp
                    .save()
                    .then((result) => {
                      console.log("Node saved ! ");
                    })
                    .catch((err) => {
                      console.log(err);
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

        res.status(200).json({
          message: "game finished ! ",
        });
  
    } else {
      console.log("the game is not finished yet !!");
      res.status(404).json({
        message: "the game is not finished yet !!",
      });
    }
  } catch (err) {
    console.log(err);
    res.json(err)
  }
};

module.exports = { displayTour, gameEnds };
