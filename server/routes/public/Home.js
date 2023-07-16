const express = require('express')
const router = express.Router();
const TournamentControllers = require("../../controllers/tournamentControllers")

router.get("/" , (req,res) => {
  //res.render("Home")
  res.send("Home")
})

router.get("/Tournaments" , TournamentControllers.displayTournaments )
// can be more routes for public 


module.exports = router