const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const root = __dirname + '/public';

http.createServer(function(req, res) {

  if (checkAccess(req)) {
    res.statusCode = 403;
    res.end("Tell me the key!");
    return;
  }

  sendFileSafe(url.parse(req.url).pathname, res);

}).listen(8080);

function checkAccess(req) {
  return url.parse(req.url, true).query.secret == '0_o';
}

function sendFileSafe(filePath, res) {
  try {
  filePath = decodeURIComponent(filePath); // decoding of incoming url
  } catch(e) {
    res.statusCode = 400;
    res.end("Bad reqest");
    return;
  }

}

function sendFileSafe(filePath, res) {

  try {
  filePath = decodeURIComponent(filePath); // decoding of url if needed
  } catch(e) {
    res.statusCode = 400;
    res.end("Bad request");
    return;
  }

  if (~filePath.indexOf('\0')) { // zero byte in url checkout
    res.statusCode = 400;
    res.end("Bad request");
  }

  filePath = path.normalize.(path.join(root, filePath)); // /deep/nodejs.jpg -> Users/learn/node/path/public/deep/nodejs.jpg

  fs.stat(filePath, function(err, stats) {
    if (err || !stats.isFile()) {
      res.statusCode = 404;
      res.end("File not found");
      return;
    }

    sendFile(filePath, res);
  });
}
function sendFile(filePath, res) {

  fs.readFile(filePath, function(err, content) {
    if (err) throw err;

    var mime = require('mime').lookup(filePath); // npm install mime --> get file extension
    res.setHeader('Content-type', mime + "; charset=utf-8"); // text/html  image/jpeg
    res.end(content);
  });
}
