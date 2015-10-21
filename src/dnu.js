var glob = require('glob');
var shell = require('gulp-shell');
var gutil = require('gulp-util');
var commands = require('./commands');

var command = commands();
var PLUGIN_NAME = 'gulp-vnext-dnu';
var DNU_COMMAND_NOT_SPECIFIED = 'Please specify the dnu command.';

function dnu(cmd, options) {
  if (!cmd) {
    throw new gutil.PluginError(PLUGIN_NAME, DNU_COMMAND_NOT_SPECIFIED);
  }
  var options = options || {};

  return shell(
    '<%= args(cmd, options, file.path) %>', {
      templateData: {
        args: args,
        cmd: cmd,
        options: options
      }
    });
};

function args(cmd, options, project) {
  return command(cmd, options || {}, project).join(' ');
};

function run(cmd, options) {
  if (!cmd) {
    throw new gutil.PluginError(PLUGIN_NAME, DNU_COMMAND_NOT_SPECIFIED);
  }

  var options = options || {};
  var source = options.src || 'src/**/project.json';
  var windows = process.platform === 'win32';
  var projects = glob.sync(source);

  var args = [];
  var command = commands();
  projects.forEach(function (project) {
    if (windows) project = '"' + project.replace(/\//g, '\\') + '"';
    args.push(command(cmd, options, project).join(' '));
  });

  return shell.task(args);
}

dnu.restore = function (options) { return run('restore', options); };
dnu.build = function (options) { return run('build', options); };
dnu.pack = function (options) { return run('pack', options); };

module.exports = dnu;
