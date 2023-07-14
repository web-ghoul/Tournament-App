const express = require("express");
const app = express();
require("dotenv").config();
const ip = "localhost";
const Port = process.env.PORT || 3000 ;
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const session = require('express-session')
const helmet = require('helmet')
const axios = require('axios');

const cors = require('cors')
const bodyParser = require('body-parser')


const HomeRoutes = require('./routes/public/Home')
const UserRoutes = require('./routes/private/User')
const AdminRoutes = require('./routes/private/Admin')
const User = require('./models/UserSchema')

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1',
    
    // your origins here
  ],
  credentials: true,
  exposedHeaders: ['set-cookie'],
};
//app.use(express.static("public"));
app.use(express.json()) //can remove
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet())
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
}));


mongoose
  .connect(process.env.DB_CONN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(Port, () => {
      console.log(`App listening at http://${ip}:${Port}`);
      console.log("Database Connected : " , result.connection.host,result.connection.name)
        let val = "Amr006" ;
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/",HomeRoutes)
app.use("/" , UserRoutes )
app.use("/Admin" , AdminRoutes)


//last to catch any wrong url ( needs cool 404 page :) ) 
app.use((req, res) => {
  res.status(404).send("Sorry can't find that!");
});
  