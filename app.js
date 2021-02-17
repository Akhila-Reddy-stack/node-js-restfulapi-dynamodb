var AWS = require("aws-sdk");
var fs = require('fs');
var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())


AWS.config.update({
    region: "local",
    endpoint: "http://localhost:8000"
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

// app.listen(4000, () => console.log('API listening on port 8000!'))