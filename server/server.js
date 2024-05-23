const express = require('express');
const body_parser = require('body-parser')
const flash = require("express-flash")
const session = require("express-session")

const mongoose = require('mongoose'); //require mongoose for mongodb databae
const passport = require("passport")

// routes
const profile_routes = require('./routes/profile');
const auth_routes = require('./routes/auth_route');
const table_routes = require("./routes/table_route")
const user_routes = require("./routes/user_route")


require('dotenv').config();

// constants

const PORT = process.env.PORT; // port to listen on
const MONGO_URI = process.env.MONGO_URI; // port to listen on
const SESSION_SECRET = process.env.MONGO_URI; // port to listen on



// creates express app
const app = express();

// logger
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})


// uses the profile export to route everything when the url has /api/profile
app.use(body_parser.urlencoded({ extended: false }))
app.use(body_parser.json())
app.use(express.json());
app.use(flash())
app.use(session({secret: SESSION_SECRET, resave: false, saveUninitialized: false}))
app.use(passport.initialize())
app.use(passport.session())

app.use("/user", user_routes);
app.use("/auth", auth_routes);
app.use("/api/profile", profile_routes);
app.use("/api/table", table_routes);



// connect to db
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Connected to server");
        // listens for requests on port
        app.listen(PORT, () => {
            console.log("Listening on port " + PORT + "!");
        })
    })
    .catch((err) => {
        console.log(err);
    });
