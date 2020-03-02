const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
require('dotenv-safe').config({
	example: path.join(__dirname, '/.env.example'),
	path: path.join(__dirname, '/.env')
});

const port = process.env.PORT;
const app = express();
app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.json({mes: 'pong'});
});
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);