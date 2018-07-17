var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World, it seems work. CDN.');

  console.log('Server running at http://cdn.antodo.local:2000/img/v1');

}).listen(2000);
