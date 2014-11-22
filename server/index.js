var socketIo = require('socket.io');
var http = require('http');
var os = require('os');

/**
 * Get ip(v4) address
 * @return {String} the ipv4 address or 'localhost'
 */
var getIPAddress = function () {
  var ifaces = os.networkInterfaces();
  var ip = '';
  for (var dev in ifaces) {
    ifaces[dev].forEach(function (details) {
      if (ip === '' && details.family === 'IPv4' && !details.internal) {
        ip = details.address;
        return;
      }
    });
  }
  return ip || "127.0.0.1";
};

function serve(port) {
  port = port || 9000;

  var server = http.Server(function(req) {

  });
  server.listen(port, function() {
    console.log('server listening on http://' + getIPAddress() + ':' + port);
  });

  var sockets = [];

  var io = socketIo(server);
  io.on('connection', onConnect);

  function onConnect(socket) {
    console.log('connection with ' + socket.client.request.headers.referer + ' established ID: ' + socket.id);
    addSocket(socket);
    socket.on('disconnect', onDisconnect.bind(null, socket));
  }

  function addSocket(socket)
  {
    sockets.push(socket);
    socket.on('message', onMessage.bind(null, socket));
  }

  function onMessage(socket, data)
  {
    console.log('message from ' + socket.id + ': ' + JSON.stringify(data));
    broadcast(this, data);
  }

  function broadcast(socket, data)
  {
    io.emit('message', data);
  }

  function onDisconnect(socket) {
    console.log(socket.id + ' disconnected');
    removeSocket(socket);
  }

  function removeSocket(socket)
  {
    var index = sockets.indexOf(socket);
    if (index !== -1) {
      sockets.splice(index, 1);
    }
  }
}
module.exports = serve;