const port = process.argv[2];
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cookieSession = require("cookie-session");
var cors = require("cors");
let app = express();

const server = require("http").Server(app);

const dotenv = require("dotenv");
dotenv.config({
  path: `.env`
});
const errorHandler = require("./server/common/errorHandler");

app.use(
  bodyParser.json({
    limit: "50mb"
  })
);
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
  })
);
app.set("trust proxy", 1);
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.COOKIEKEY1, process.env.COOKIEKEY2],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours ( Todo )mobile app we will not expire session
  })
);
app.use(cookieParser());

/*----------------------------------------------------------------
                  Allow cross origin requests
------------------------------------------------------------------*/
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:8000"],
    methods: ["GET", "POST"],
    credentials: true // enable set cookie
  })
);

app.use(passport.initialize());
app.use(passport.session());
require("./server/middleware/passport");

/*----------------------------------------------------------------
                  Router Export
------------------------------------------------------------------*/
const Router = require("./server/app");
app.use(Router);
app.use(errorHandler.errorSend);
/*----------------------------------------------------------------
                  Server Listen
------------------------------------------------------------------*/
server.listen(port, function() {
  console.log(`Server is running on port ${port} Database connection on Local`);
});
