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
const path = require('path');
const cors = require('cors')
const bodyParser = require('body-parser')

const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const HomeRoutes = require('./routes/public/Home')
const UserRoutes = require('./routes/private/User')
const AdminRoutes = require('./routes/private/Admin')
//const User = require('./models/UserSchema')

//app.use(express.static("public"));
const corsOptions = {
  origin: [
    'https://chess-tournament.onrender.com',
    'http://localhost:3001',
    'https://lichess.org',
    '*'
    

    // your origins here
  ],
  credentials: true,
  exposedHeaders: ['set-cookie'],
};


app.use(express.json()) //can remove
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", 'https://lichess.org/', 'https://chess-tournament.onrender.com/' , 'http://localhost:3001']
    }
  }
}));

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));



app.use("/api",HomeRoutes)
app.use("/api" , UserRoutes )
app.use("/api/Admin" , AdminRoutes)

// app.use(express.static(path.join(__dirname , '../client/build')))
// app.get("*" , function (req,res) {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'))
  
// }
// )

app.use(notFound);
app.use(errorHandler);


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


//last to catch any wrong url ( needs cool 404 page :) ) 
