const http = require('http');

const server =  http.createServer(function (req, res) {
  let url = req.url;
  res.write(url);
  res.end();
});

server.listen(8090, 'localhost', () => console.log('localhost: 8090'))