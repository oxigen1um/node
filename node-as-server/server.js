const http = require('http');

const server = new http.Server(); //EventEmitter
// http.Server -> net.Server -> events.EventEmitter (inherits chain)
server.listen(8000);

var emit = server.emit; // redefine standart emit object
server.emit = function(event) {
  console.log(event);
  emit.apply(server, arguments);
}

var counter = 0;
server.on('request', function(req, res) {
  res.end("Hello, world!" + counter++);
});
// keep alive (max length of connection)
