#!/usr/bin/env node

require(__dirname + '/globals.js');
require(__dirname + '/commands/login.js');
require(__dirname + '/commands/logout.js');
require(__dirname + '/commands/catalog.js');
require(__dirname + '/commands/new.js');
require(__dirname + '/commands/library.js');
require(__dirname + '/commands/addcontent.js');
require(__dirname + '/commands/adapt.js');
require(__dirname + '/commands/docs.js');
require(__dirname + '/commands/logs.js');
require(__dirname + '/commands/resetdefaults.js');

/*
    ===[ COMMANDS START ]===
*/
program
  .version(require(__dirname + '/package').version);

program.parse(process.argv);

if (!program.args.length) program.help();