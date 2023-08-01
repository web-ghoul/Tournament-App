const express = require("express");
const router = express.Router();
const authControllers = require("../../controllers/authControllers");
const authenticateMidd = require("../../middleware/authenticate");
const userControllers = require("../../controllers/userControllers");
const tournamentControllers = require("../../controllers/tournamentControllers");
const pointsTournamentControllers = require("../../controllers/pointsTournamentControllers");
const axios = require("axios");



router.get("/Profile/:Name", authenticateMidd, (req, res) => {
  //res.render("Profile")
  const Name = req.params.Name;
  axios
    .get(`https://lichess.org/api/user/${Name}`)
    .then(function (response) {
      // handle success
      console.log(response.data);
      res.send(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  //res.send("Profile")
});

router.post("/register", authControllers.register);

router.get("/user/verify/:userId/:uniqueString", authControllers.verify);


router.post("/login", authControllers.login);


router.post(
  "/JoinTournament/:id",
  authenticateMidd,
  userControllers.joinTournament
);

router.post(
  "/EnterTournament/:id",
  userControllers.EnterTournament , (req,res) => {
    res.status(200).json({
      message : "User entered tournament successfully"
    })}
);

router.post(
  "/displayGraph/:id",
  authenticateMidd,
  userControllers.EnterTournament , tournamentControllers.displayNodes
);

router.post(
  "/displayPoints/:id",
  
  userControllers.EnterTournament , pointsTournamentControllers.displayNodes
);

router.post("/ForgotPassword" , authControllers.forgetPassword );

router.get("/user/resetPassword/:userId/:uniqueString" , authControllers.resetEmail , (req,res) => {
    //res.render("reset Password Page")
    req.session.userId= req.params.userId ;
    res.status(200).json({user_id :req.params.userId 
    })
  }
)

router.post("/ResetPassword" , authControllers.resetPassword );

router.post("/Node/:game_id/:node_id" , authenticateMidd , tournamentControllers.gameEnds  , tournamentControllers.displayNodes) ;

router.post("/PointsNode/:game_id" , authenticateMidd , pointsTournamentControllers.gameEnds  , pointsTournamentControllers.displayNodes)

router.post("/AbortMatch/:game_id/:node_id" , authenticateMidd , tournamentControllers.abortMatch , tournamentControllers.gameEnds , tournamentControllers.displayNodes);

router.post("/GameEntered/:node_id" , authenticateMidd , tournamentControllers.savingEntry)

router.post("/FinishedTutorial" , authenticateMidd , userControllers.finishedTutorial)

router.get("/DisplayFinishedTournaments" , tournamentControllers.displayFinishedTournaments  )

router.post("/PointsGameEntered/:game_Id" , authenticateMidd ,pointsTournamentControllers.savingEntry)

router.post("/PointsAbortMatch/:game_Id" , authenticateMidd , pointsTournamentControllers.abortMatch , pointsTournamentControllers.gameEnds , pointsTournamentControllers.displayNodes)

module.exports = router;
