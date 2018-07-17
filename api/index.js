var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World, it seems work. Api.');

  console.log('Server running at http://api.antodo.local:3000/api/v1');

}).listen(3000);

