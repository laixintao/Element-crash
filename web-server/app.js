var express = require("express");

var app = express.createServer();

app.use(express.static("public"));

app.listen(3001)