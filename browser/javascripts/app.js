rivets.formatters.bind = function(/*fn, thisArg[, arg1, arg2, ..., argN]*/)
{
  var args = Array.prototype.slice.call(arguments);
  var fn = args.shift();
  var self = args.shift();

  if (typeof fn === 'function') {
    return function() {
      fn.apply(self, args);
    }
  }

  return fn;
};

window.app = (function() {
  var self = this;
  this.messages = [];
  this.host = 'http://localhost';
  this.port = 9000;

  this.connect = function(host, port)
  {
    this.host = host || this.host;
    this.port = port || this.port;

    this.socket = io(this.host + ':' + this.port);
    this.socket.on('message', onMessage);
  };

  function onMessage(data)
  {
    data.date = new Date();
    self.messages.push(data);
  }

  rivets.bind(document.getElementById('app'), {
    app: this
  });
})();