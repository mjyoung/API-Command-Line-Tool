#!/usr/bin/env node

/**
 * Can execute OS commands using below code
 */

var sys = require('sys')
var exec = require('child_process').exec;
// function puts(error, stdout, stderr) { sys.puts(stdout) }
// exec("ls", puts);

/**
 * Module dependencies.
 */

var program     = require('commander');
var inquirer    = require('inquirer');

var cmdify      = require("cmdify");
var spawn       = require("child_process").spawn;

var Table       = require('cli-table');
var colors      = require('colors');
/*
  COLORS:
    black, red, green, yellow, blue, magenta, cyan, white, gray, grey
  BG COLORS:
    bgBlack, bgRed, bgGreen, bgYellow, bgBlue, bgMagenta, bgCyan, bgWhite
*/

var Chance      = require('chance');
var ProgressBar = require('progress');

var chance      = new Chance();

/*
    ===[ WATSON LOGO (Array) ]===
*/
var watsonLogo = [
"                   oo",
"        oo.        oo        :+:",
"        :oo`       oo       -oo.",
"         :oo`      -:      .oo.",
".`        -:` `.::::::::.` .:.        `.",
"ooo/.      -/ooo/:../oo/soo+-`     ./ooo",
" .:ooo  `/oo/////o+/os++yoosss/`  ooo:.",
"    `. :so-     -/oo+++:s:  `-/o/ .`",
"      +ss   ..//-.oo  .:o+-    :oo`",
"     +os:  .yy-`:oo-    y-o++/  ooo",
"    -o//s`//` `soooo:yy/y:oooooooso:",
"    :o.`ysy///:/ooo/  -so  .-o+oo+o+",
"    :ooyyy-    :o: .. `y:..::+oo+:oo",
"    :o+s+:s-...oo:oooooso++:oo+o/.o:",
"    `oss:::/ssoo+:/++/y`-::oo- /o+o.",
"     .os-   +yso:   `o-`oooo:  :oo:",
"      .oo.    :oo-` +o+o+/+-  .oo:",
"       `/oo:::+o:sssss/.   .-/o/`",
"         `/ooooo/:s/`.:/ossso/`",
"            .:/+oss+++oo++:."
];


/*
    ===[ TABLES START ]===
*/

// Instantiate new tables
var service_all_table = new Table({
  // chars: {'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': ''},
  chars: { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': ''
         , 'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': ''
         , 'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': ''
         , 'right': '' , 'right-mid': '' , 'middle': ' ' },
  head: ['SERVICE'.cyan, 'DESCRIPTION'.cyan, 'PLANS'.cyan],
  colWidths: [25,75,25]
});

// table is an Array, so you can `push`, `unshift`, `splice` and friends
service_all_table.push(
    ['Concept Expansion', 'Maps euphemisms or colloquial terms to more commonly understood phrases.', 'Free, Standard, Premium'],
    ['Language Identification', 'Identifies the language in which text is written.', 'Free, Standard, Premium'],
    ['Machine Translation', 'Globalize on the fly. Translate text from one language to another.', 'Free, Standard, Premium'],
    ['Message Resonance', 'Communicate with people with a style and words that suits them.', 'Free, Standard, Premium'],
    ['Question and Answer', 'Direct responses to user inquiries fueled by primary document sources.', 'Free, Standard, Premium'],
    ['Relationship Extraction', 'Intelligently finds relationships between sentence components.', 'Free, Standard, Premium'],
    ['User Modeling', 'Improved understanding of user preferences and personality traits.', 'Free, Standard, Premium'],
    ['Visualization Rendering', 'Graphical representations of data analysis for easier understanding.', 'Free']
);

var library_table = new Table({
  // chars: {'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': ''},
  chars: { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': ''
         , 'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': ''
         , 'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': ''
         , 'right': '' , 'right-mid': '' , 'middle': ' ' },
  head: ['SID'.cyan, 'CONTENT NAME'.cyan, 'DESCRIPTION'.cyan, 'APIs'.cyan],
  colWidths: [20,25,60,25]
});

library_table.push(
  ['ng-en-geography', 'World Geography', 'Geography of the world curated by National Geographic.', 'Relationship Extraction'],
  ['lm-en-weapons', 'Weapons', 'Weapons database curated by Lockheed Martin.', 'Relationship Extraction']
);

/*
    ===[ COMMANDS START ]===
*/

program
  .version("0.0.3");

program
  .command("login")
  .description("Login to the Watson APIs using your Bluemix credentials.")
  .action(function() {
    var questions = [
      {
        type: "input",
        name: "username",
        message: "What is your Bluemix username?"
      },
      {
        type: "password",
        message: "Please enter your Bluemix password:",
        name: "password"
      }
    ];

    inquirer.prompt( questions, function( answers ) {
      console.log("You have successfully logged in.");
      // console.log( JSON.stringify(answers, null, "  ") );
    });
  });

program
  .command("new")
  .description("Create a new Watson project, which will house your individual API instances.")
  .action (function() {

    console.log('');
    for (var i = 0; i < watsonLogo.length; i++) {
      console.log(watsonLogo[i]);
    }
    console.log('');

    console.log("Hi, I'm Watson! I'm going to walk you through setting up your new project with the Watson APIs! \n".blue);

    var questions = [
      {
        type: "input",
        name: "project",
        message: "What would you like to name your project?"
      },
      {
        type: "checkbox",
        message: "Which APIs would you like to use with your project?",
        name: "selectedAPIs",
        choices: [
          // new inquirer.Separator("These are the most popular APIs among the Watson Developer community:"),
          // new inquirer.Separator("And these are the rest:"),
          {
            name: "Concept Expansion",
          },
          {
            name: "Language Identification"
          },
          {
            name: "Machine Translation",
          },
          {
            name: "Message Resonance",
            // checked: true
          },
          {
            name: "Question and Answer",
            // disabled: "temporarily unavailable"
          },
          {
            name: "Relationship Extraction",
          },
          {
            name: "User Modeling"
          },
          {
            name: "Visualization Rendering",
          }
        ],
        validate: function( answer ) {
          if ( answer.length < 1 ) {
            return "You must choose at least one service.";
          }
          return true;
        }
      }
    ];

    inquirer.prompt( questions, function( answers ) {
      // console.log("Answers");
      // console.log( JSON.stringify(answers, null, "  ") );

      /*
          ===[ LOADING TEXT ]===
      */
      var loader = [
        "I'm working",
        "I'm working.",
        "I'm working..",
        "I'm working..."
      ];
      /*
          ===[ LOADING TEXT END ]===
      */

      var newBottomBar = function() {
        var ui = new inquirer.ui.BottomBar({ bottomBar: loader[i % 4] });
        return ui;
      }

      var createApplication = function() {
        console.log("Creating your application in Bluemix...".yellow);
        var ui = newBottomBar();
        var i = 4;

        var count = 1;
        var interval = setInterval(function() {
          ui.updateBottomBar( loader[i++ % 4] );
          count++;
          if (count == 25) {
            ui.updateBottomBar("I'm done creating your application!\n".green);
            console.log("  Application ".green + ">> " + "Services ".yellow + ">> " + "Boilerplate ".yellow);
            clearInterval(interval);
            createServices();
          }
        }, 200 );

      };

      var createServices = function() {
        console.log("Creating your services in Bluemix...".yellow);
        var ui = newBottomBar();
        var i = 4;

        var count = 1;
        var interval = setInterval(function() {
          ui.updateBottomBar( loader[i++ % 4] );
          count++;
          if (count == 25) {
            ui.updateBottomBar("I'm done creating your services!\n".green);
            console.log("  Application ".green + ">> " + "Services ".green + ">> " + "Boilerplate ".yellow);
            clearInterval(interval);
            createBoilerplate();
          }
        }, 200 );

      };

      // var cmd = spawn(cmdify("ls"), [ "-la" ], { stdio: "pipe" });
      // cmd.stdout.pipe( ui.log );
      // cmd.on( "close", function() {
      //   ui.updateBottomBar("I'm done working!\n");
      //   process.exit();
      // });

      var createBoilerplate = function() {
        console.log("Creating boilerplate code for your project...".yellow);
        var ui = newBottomBar();
        var i = 4;

        var count = 1;
        var interval = setInterval(function() {
          ui.updateBottomBar( loader[i++ % 4] );
          count++;
          if (count == 25) {
            ui.updateBottomBar("I'm done creating your boilerplatecode!\n".green);
            console.log("  Application ".green + ">> " + "Services ".green + ">> " + "Boilerplate ".green);
            clearInterval(interval);
            console.log("Type ".blue + "cf push ".yellow + answers.project.yellow + " to test your application in Bluemix.".blue);
            process.exit();
          }
        }, 200 );

      };

      createApplication();

    });
  });

program
  .command("catalog")
  .description("List all Watson APIs available in the catalog.")
  .action (function() {
    console.log(service_all_table.toString());
  });

program
  .command("library")
  .description("List all content that you have purchased or uploaded.")
  .action( function() {
    console.log(library_table.toString());
  });

program
  .command("docs")
  .description("Browse the Watson API Documentation.")
  .action (function() {
    console.log('Documentation!');
  });

program.parse(process.argv);

if (!program.args.length) program.help();


