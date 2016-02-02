'use strict';

const express = require('express');
const bodyParser = require('body-parser');
let app = express();

app.use(express.static(__dirname + '/static'));

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('hello world');
});

app.get('/json', (req, res) => {
  res.send({a: 1, b: 2});
});

app.post('/post', (req, res) => {
  if (req.body.a === 1) {
    res.send({ success: true });
  } else {
    res.send({ success: false });
  }
});

app.put('/put', (req, res) => {
  if (req.body.a === 1) {
    res.send({ success: true });
  } else {
    res.send({ success: false });
  }
});

app.delete('/delete/:id', (req, res) => {
  if (req.params.id === '1') {
    res.send({ success: true });
  } else {
    res.send({ success: false });
  }
});

app.get('/jsonp', (req, res) => {
  let method = req.query.callback;
  res.send(`${method}({"success": true})`);
});

app.get('/jsonp-delay', (req, res) => {
  let method = req.query.callback;
  let time = new Date().getTime();
  res.send(`${method}({"time": ${time}})`);
});

app.get('/jsonp-cccbbb', (req, res) => {
  let method = req.query.cccbbb;
  res.send(`${method}({"success": true})`);
});

app.get('/jsonp-data', (req, res) => {
  let method = req.query.callback;
  if (req.query.q === '123') {
    res.send(`${method}({"success": true})`);
  } else {
    res.send(`${method}({"success": false, "msg": "expect q === '123'"})`);
  }
});

app.get('', () => {});

app.get('/cache', (req, res) => {
  res.send({ time: new Date().getTime() });
});

let httpServer = require('http').createServer(app);

module.exports = {
  start: function (port) {
    port = port || '8080';
    httpServer.listen(port);
  },

  close: function () {
    httpServer.close();
  }
};

