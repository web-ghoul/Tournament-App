const User = require("../models/UserSchema");
const Tournament = require("../models/Tournament");

const addAdmin = (req, res, nxt) => {
  if (req.role == "Admin") {
    const name = req.body.name;

    User.findOneAndUpdate({ Name: name }, { role: "Admin" }, { new: true })
      .then((result) => {
        console.log(result);
        if (result) res.send("admin Added");
        else res.send("user not found !");
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  } else {
    res.send("You are not authorized");
  }
};

const addTournament = (req, res, nxt) => {
  if (req.role == "Admin") {
    const { name, type, time, max, description, startsAt } = req.body;

    const Tourn = new Tournament({
      Name: name,
      Type: type,
      Time: time,
      Max: max,
      Description: description,
      StartsAt: startsAt,
    });
    Tourn.save()
      .then((result) => {
        res.send("Tournament saved !!");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.send("You are not authorized");
  }
};

module.exports = { addAdmin, addTournament };
