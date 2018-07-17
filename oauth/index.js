var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World, it seems work. Auth.');

  console.log('Server running at http://oauth.antodo.local:5000/oauth/v1');

}).listen(5000);