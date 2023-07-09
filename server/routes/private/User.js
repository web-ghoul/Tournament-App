const express = require("express");
const router = express.Router();
const authControllers = require("../../controllers/authControllers");
const authenticateMidd = require("../../middleware/authenticate");
const userControllers = require("../../controllers/userControllers");
const axios = require("axios");

router.get("/login", (req, res) => {
  //res.render("login")
  res.send("login");
});

router.get("/register", (req, res) => {
  //res.render("register")
  res.send("register");
});

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
  authenticateMidd,
  userControllers.EnterTournament
);

router.post("/ForgotPassword" , authControllers.forgetPassword );

router.get("/user/resetPassword/:userId/:uniqueString" , authControllers.resetEmail , (req,res) => {
  //res.render("reset Password Page")
  req.session.userId= req.params.userId ;
  res.send("reset Password Page")
}
)

router.post("/ResetPassword" , authControllers.resetPassword ) ;



module.exports = router;
