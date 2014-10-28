/*
    ===[ GLOBAL VARIABLES ]===
*/

/**
 * Can execute OS commands using below code
 */
sys         = require('sys')
nconf       = require('nconf');
exec        = require('child_process').exec;

/**
 * Module dependencies.
 */
program     = require('commander');
inquirer    = require('inquirer');
Table       = require('cli-table');
ProgressBar = require('progress');
Chance      = require('chance');
chance      = new Chance();
colors      = require('colors');
/*
 * COLORS:    black, red, green, yellow, blue, magenta, cyan, white, gray, grey
 * BG COLORS: bgBlack, bgRed, bgGreen, bgYellow, bgBlue, bgMagenta, bgCyan, bgWhite
 */

/*
 * cmdify and spawn not currently being used but can be used to run OS commands,
 * or things like cf push if there is time to implement that later on
 */
cmdify      = require("cmdify");
spawn       = require("child_process").spawn;

/*
    ===[ CONFIG OPTIONS AND GLOBAL VARIABLES FROM config.json ]===
*/
nconf.use('file', { file: __dirname + '/config.json' });
nconf.load();
watsonLogo = nconf.get('watsonLogo');
loggedIn = nconf.get('loggedIn');
library = nconf.get('library');
catalog = nconf.get('catalog');

puts = function(error, stdout, stderr) {
  sys.puts(stdout);
}
// exec("ls", puts);

resetDefaults = function() {
  var defaultLibrary = nconf.get('defaultLibrary');
  nconf.set('library', defaultLibrary);

  var defaultAdapt = nconf.get('defaultAdapt');
  nconf.set('adapt', defaultAdapt);
  nconf.save();
}
