"use strict";

var express = require('express');

var _require = require('luxon'),
    DateTime = _require.DateTime;

var app = express();
var port = 3001;
app.use(express.json());
app.post('/', function (req, res) {
  var timeZone = req.body && req.body.timeZone ? req.body.timeZone : 'America/New_York';
  var responseTime = DateTime.local().setZone(timeZone).toLocaleString(DateTime.TIME_24_WITH_SECONDS);
  res.send(responseTime);
});
app.listen(port, function () {
  console.log("Example app listening at http://localhost:".concat(port));
});