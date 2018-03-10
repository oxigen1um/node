const http = require('http');
const fs = require('fs');

new http.Server(function(req, res) {
  // res instanceof http.ServerResponse < stream.Writable
  
  if (req.url == '/file.html') {
    
    var file = new fs.ReadStream('file.html');
    sendFile(file, res);
  }
}).listen(8080);

function sendFile(file, res) {
  
  file.on('readable', write);
  
  function write() {
    var fileContent = file.read(); // read file
    
    if (fileContent && !res.write(fileContent)) { // send file
      
      file.removeListener('readable', write);
      
      res.once('drain', function() { // w8 for prevent reading
        file.on('readable', write);
        write();
      });
      
    }
  }
  file.on('end', function() {
    res.end();
  });
}