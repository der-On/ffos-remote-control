var path = require('path');
var tools = require('jake-tools');

var browserifyOpts = {
  src: [path.join(__dirname, 'ffos', 'javascripts', 'app.js')],
  dest: path.join(__dirname, 'ffos', 'javascripts', 'app.compiled.js'),
  vendorSrc: [path.join(__dirname, 'ffos', 'javascripts', 'vendors.js')],
  vendorDest: path.join(__dirname, 'ffos', 'javascripts', 'vendors.compiled.js'),
  debug: true,
  baseDir: __dirname,
  'package': path.join(__dirname, 'package.json'),
  vendorExclude: ['font-awesome', 'socket.io']
};

var lessOpts = {
  src: [path.join(__dirname, 'ffos', 'less', '*.less')],
  dest: path.join(__dirname, 'ffos', 'css')
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