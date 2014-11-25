var path = require('path');
var tools = require('jake-web-utils');
var http = require('http');
var server = require('./server');
var staticServer = require('node-static');

var browserifyOpts = {
  src: [path.join(__dirname, 'ffos', 'javascripts', 'app.js')],
  dest: path.join(__dirname, 'ffos', 'javascripts', 'app.compiled.js'),
  vendorSrc: [path.join(__dirname, 'ffos', 'javascripts', 'vendors.js')],
  vendorDest: path.join(__dirname, 'ffos', 'javascripts', 'vendors.compiled.js'),
  debug: true,
  baseDir: __dirname,
  'package': path.join(__dirname, 'package.json'),
  vendorExclude: ['font-awesome', 'socket.io', 'node-static', 'jake-web-utils']
};

var lessOpts = {
  src: [path.join('./ffos', 'less', '*.less')],
  dest: path.join('./ffos', 'css')
};

desc('compiles less files');
task('less', {async:true}, function lessTask() {
  tools.compileLess(lessOpts, complete);
});

desc('compiles javascript using browserify');
task('browserify', {async: true}, function browserifyTask() {
  tools.compileBrowserify(browserifyOpts, complete);
});

desc('watches files for changes and rebuilds if needed');
task('watch', {async: true}, function watchTask() {
  tools.watchBrowserify(browserifyOpts);
  tools.watchLess(lessOpts);
});

desc('builds/compiles files');
task('build', ['browserify', 'less'], function buildTask() {});

desc('serves the socket.io server. Usage jake server[[port]]');
task('server', {async:true}, function serverTask(port) {
  server(port);
});

desc('serves static files. Usage jake static-server[[port]]');
task('static-server', {async:true}, function staticServerTask(port) {
  port = port || 8000;
  var server = new staticServer.Server('./');
  http.createServer(function(req, res) {
    req.addListener('end', function() {
      server.serve(req, res);
    }).resume();
  }).listen(port);

  console.log('static server listening on http://localhost:' + port);
});