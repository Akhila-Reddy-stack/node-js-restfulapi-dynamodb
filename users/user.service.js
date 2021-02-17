const config = require("config.json");
const jwt = require("jsonwebtoken");
const cors = require("cors");
var express = require("express");
var app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// users hardcoded for simplicity, store in a db for production applications
var users = [];
users = [
  {
    id: 1,
    username: "test",
    password: "test",
    firstName: "Test",
    lastName: "User",
  },
];

module.exports = {
  authenticate,
  getAll,
  auth,
};

async function authenticate(req, res) {
  console.log("pooooo", users);
  var username = req.body.username;
  var password = req.body.password;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) throw "Username or password is incorrect";

  // create a jwt token that is valid for 7 days
  const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: "7d" });
  let message = "LoggedIn Sucessfully!";
  res.send({ data:(user),token, message: "LoggedIn Sucessfully!" });
  return {
    ...omitPassword(user, (message = "LoggedIn Sucessfully!")),
    token,
  };
}

async function auth(req, res) {
  //   console.log("loooo");
  //   var id = req.body;
  //   var username = req.body;
  //   var password = req.body;
  //   var firstName = req.body;
  //   var lastName = req.body;
  //   var usersData = [];
  users.push({
    id: req.body.id,
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  //   console.log(users, "usersData");

  res.send({ data: users, message: "Data added Sucessfully!" });
}

async function getAll() {
  return users.map((u) => omitPassword(u));
}

// helper functions

function omitPassword(user) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
