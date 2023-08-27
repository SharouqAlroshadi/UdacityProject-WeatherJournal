// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
//set up body-parser
const bodyParser = require("body-parser");
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8000;
const server = app.listen(port, listening);

//let's  start the server

function listening() {
  console.log("server is running");
  console.log(`server is running on localhost: ${port}`);
}

//get data from server

app.get("/all", function (req, res) {
  console.log(req);
  res.send(projectData);
});

//Post data

app.post("/add", addData);

function addData(req, res) {
  console.log(req.body);
  projectData.date = req.body.date;
  projectData.temp = req.body.temp;
  projectData.content = req.body.content;
  res.send({ msg: "Done" });
}
app.post("/addEntry", entryData);

function entryData(req, res) {
  console.log("POST Request successful");
  console.log(req.body);
  projectData = {
    date: req.body.date,
    temp: req.body.temp,
    content: req.body.content,
  };
  res.send(projectData);
  console.log(projectData);
}
