const http = require('http');
const url = require('url');

var log = require('./log')(module);

var server = new http.Server(function(req, res) {
  console.log(req.method, req.url);

  var urlParsed = url.parse(req.url, true); // second param activate parsing of query parametr ( query: 'message=lol' => query {message: lol} ) to object with all variables
  console.log(urlParsed);
  if (urlParsed.pathname == '/echo' && urlParsed.query.message) {
    // res.writeHead(...) setting headers instantly
    res.setHeader('Cache-control', 'no-cache');
    res.end(urlParsed.query.message);
  } else {
    res.statusCode = 404;
    res.end("Page not found");
  }
});

server.listen(8080);
