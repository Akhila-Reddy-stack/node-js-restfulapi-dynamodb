require('rootpath')();
const express = require('express');
const app = express();
var AWS = require("aws-sdk");
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


AWS.config.update({
    region: "local",
    endpoint: "http://localhost:4000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

const sourceFile = require('./qrgenerator');

app.get('/getQRlist', function (req, res) {
    res.send({ data: sourceFile })
})

app.get('/getQRlistbyItemNumber', function (req, res) {
    var ItemNumber = req.body.ItemNumber;
    var singleData = sourceFile;
    var outputData = [];
    singleData.forEach(item => {
        if (ItemNumber === item.Itemnumber) {
            outputData.push(item)
        }
    })
    res.send({ data: outputData })
})
// use JWT auth to secure the api
app.use(jwt());
// app.use('', require('./app'));
// api routes
app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);




// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});