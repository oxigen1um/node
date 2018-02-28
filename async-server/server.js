const http = require('http');
const fs = require('fs');

const server = new http.Server();

server.on('request', (req, res) => {

  console.log(req.url);
  res.setHeader('Cache-control', 'no-cache');

  if (req.url = '/') {
    fs.readFile('index.html', function(err, data) {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        res.end("Server error");
      }
      res.end(data);
    });
  }
});

server.listen(8080);
