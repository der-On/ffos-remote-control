var io = require('socket.io-client');
var rivets = require('rivets');
var localforage = require('localforage');

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

function noop() {}

function Event(name)
{
  this.name = name;
}

var app = (function() {
  var self = this;
  this.newEventName = '';
  this.editing = false;
  this.events = [];
  this.host = 'http://localhost';
  this.port = 9000;
  this.inited = false;

  this.addEvent = function(name)
  {
    this.events.push(new Event(name));
    this.saveEvents();
  };

  this.removeEvent = function(event)
  {
    var index = this.events.indexOf(event);

    if (index !== -1) {
      this.events.splice(index, 1);
    }
    this.saveEvents();
  };

  this.emitEvent = function(name)
  {
    // prevent accidental hitting while in edit mode
    if (this.editing) return;

    this.socket.emit(name);
  };

  this.toggleEditing = function()
  {
    this.editing = !this.editing;
  };

  this.loadEvents = function(cb)
  {
    cb = cb || noop;

    localforage.getItem('events', function(error, events) {
      self.events = events.map(function(name) {
        return new Event(name);
      });
      cb(null);
    });
  };

  this.saveEvents = function(cb)
  {
    localforage.setItem('events', this.events.map(function(event) {
      return event.name;
    }), cb || noop);
  };

  this.init = function()
  {
    this.socket = io(this.host + ':' + this.port);
    this.inited = true;
    this.saveSettings();
    this.loadEvents();
  };

  this.loadSettings = function()
  {
    localforage.getItem('host', function(err, host) {
      self.host = host || self.host;
    });
    localforage.getItem('port', function(err, port) {
      self.port = port || self.port;
    });
  };

  this.saveSettings = function()
  {
    localforage.setItem('host', this.host, noop);
    localforage.getItem('port', this.port, noop);
  };

  this.loadSettings();

  rivets.bind(document.getElementById('app'), {
    app: this
  });


})();