const express = require('express')
const router = express.Router();


router.get("/" , (req,res) => {
  //res.render("Home")
  res.send("Home")
})

// can be more routes for public 


module.exports = router