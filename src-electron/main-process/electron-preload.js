const http = require('http');
const express = require('express');
const expressApp = express();
const router = express.Router();

const PORT = 8000;
const VERSIONS_INFO = process.versions;

const init = () => {
  router.get('/', function(req, res) {
    console.log('Serving ping:');
    res.json({pong: VERSIONS_INFO});
  });

  expressApp.use('/', router);

  http.createServer(expressApp).listen(PORT, function() {
    console.log(`Server start at port ${PORT}`)
  });
};

init();
