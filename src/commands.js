var commands = {
  restore: restore,
  build: build,
  pack: pack
}

var DEFAULT_CONFIGURATION = 'Release';

function restore(options, src) {
  var args = command('restore');
  if (src) args.push(src);
  if (options.noCache) args.push('--no-cache');
  if (options.parallel) args.push('--parallel');
  return args;
}

function build(options, src) {
  options.configuration = options.configuration || DEFAULT_CONFIGURATION;

  var args = command('build');
  if (src) args.push(src);
  args.push('--configuration', options.configuration);
  return args;
}

function pack(options, src) {
  options.configuration = options.configuration || DEFAULT_CONFIGURATION;

  var args = command('pack');
  if (src) args.push(src);
  if (options.out) args.push('--out', options.out);
  args.push('--configuration', options.configuration);
  return args;
}

function command(name) {
  return ['dnu', name]
}

module.exports = function () {
  return function(command, options, src) {
    return commands[command](options, src)
  }
};
