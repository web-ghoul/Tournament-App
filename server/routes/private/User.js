const express = require("express");
const router = express.Router();
const authControllers = require("../../controllers/authControllers");
const authenticateMidd = require("../../middleware/authenticate");
const userControllers = require("../../controllers/userControllers");
const tournamentControllers = require("../../controllers/tournamentControllers");
const pointsTournamentControllers = require("../../controllers/pointsTournamentControllers");
const axios = require("axios");




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

router.post("/Node/:game_Id/:node_id" , authenticateMidd , tournamentControllers.gameEnds  , tournamentControllers.displayNodes) ;

router.post("/PointsNode/:game_Id" , authenticateMidd , pointsTournamentControllers.gameEnds  , pointsTournamentControllers.displayNodes)

router.post("/AbortMatch/:game_Id/:node_id" , authenticateMidd , tournamentControllers.abortMatch , tournamentControllers.gameEnds , tournamentControllers.displayNodes);

router.post("/GameEntered/:node_id" , authenticateMidd , tournamentControllers.savingEntry)

router.post("/FinishedTutorial" , authenticateMidd , userControllers.finishedTutorial)

router.get("/DisplayFinishedTournaments" , tournamentControllers.displayFinishedTournaments  )

router.post("/PointsGameEntered/:game_Id" , authenticateMidd ,pointsTournamentControllers.savingEntry)

router.post("/PointsAbortMatch/:game_Id" , authenticateMidd , pointsTournamentControllers.abortMatch , pointsTournamentControllers.gameEnds , pointsTournamentControllers.displayNodes)

router.get("/DisplayFinishedBracketsNode/:id",tournamentControllers.displayFinishedTournamentsNodes)

router.get("/DisplayFinishedPointsNode/:id",pointsTournamentControllers.displayFinishedTournamentsNodes)


module.exports = router;
