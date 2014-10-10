#!/usr/bin/env node

/**
 * Can execute OS commands using below code
 */

var sys         = require('sys')
var nconf       = require('nconf');
var exec        = require('child_process').exec;
// function puts(error, stdout, stderr) { sys.puts(stdout) }
// exec("ls", puts);

/**
 * Module dependencies.
 */
var program     = require('commander');
var inquirer    = require('inquirer');
var Table       = require('cli-table');
var ProgressBar = require('progress');
var Chance      = require('chance');
var chance      = new Chance();
var colors      = require('colors');
/*
 * COLORS:    black, red, green, yellow, blue, magenta, cyan, white, gray, grey
 * BG COLORS: bgBlack, bgRed, bgGreen, bgYellow, bgBlue, bgMagenta, bgCyan, bgWhite
 */

/*
 * cmdify and spawn not currently being used but can be used to run OS commands,
 * or things like cf push if there is time to implement that later on
 */
var cmdify      = require("cmdify");
var spawn       = require("child_process").spawn;

/*
    ===[ CONFIG OPTIONS AND GLOBAL VARIABLES FROM config.json ]===
*/
nconf.use('file', { file: __dirname + '/config.json' });
nconf.load();
var watsonLogo = nconf.get('watsonLogo');
var loggedIn = nconf.get('loggedIn');
var library = nconf.get('library');
var catalog = nconf.get('catalog');

var resetLibrary = function() {
  var defaultLibrary = [
    [
      "ng-en-geography",
      "World Geography",
      "Geography of the world curated by National Geographic.",
      "Relationship Extraction"
    ],
    [
      "lm-en-weapons",
      "Weapons",
      "Weapons database curated by Lockheed Martin.",
      "Relationship Extraction"
    ]
  ];

  nconf.set('library', defaultLibrary);
  nconf.save();
}

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

// service_all_table is an Array, so you can `push`, `unshift`, `splice` and friends
for (var i = 0; i < catalog.length; i++) {
  service_all_table.push(catalog[i]);
}

var library_table = new Table({
  // chars: {'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': ''},
  chars: { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': ''
         , 'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': ''
         , 'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': ''
         , 'right': '' , 'right-mid': '' , 'middle': ' ' },
  head: ['SID'.cyan, 'CONTENT NAME'.cyan, 'DESCRIPTION'.cyan, 'APIs'.cyan],
  colWidths: [20,25,60,25]
});

for (var i = 0; i < library.length; i++) {
  library_table.push(library[i]);
}

/*
    ===[ COMMANDS START ]===
*/
program
  .version(require(__dirname + '/package').version);

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
      loggedIn = true;
      nconf.set('loggedIn', loggedIn);
      nconf.save();
      console.log("You have successfully logged in.");
      // console.log( JSON.stringify(answers, null, "  ") );
    });
  });

program
  .command("logout")
  .description("Log out of Bluemix.")
  .action(function() {
    loggedIn = false;
    nconf.set('loggedIn', loggedIn);
    nconf.save();
    console.log("You have been logged out of Bluemix.");
  });

program
  .command("new")
  .description("Create a new Watson project, which will house your individual API instances.")
  .action (function() {
    if (!loggedIn) {
      console.log("You need to log in to Bluemix to access that command.".blue);
      console.log("Please type ".blue + "ibmwatson login ".yellow + "to login to Bluemix.".blue);
    }
    else {
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
          name: "selectedAPIs",
          message: "Which APIs would you like to use with your project?",
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
        },
        {
          type: "list",
          name: "runtime",
          message: "Which runtime would you like to generate boilerplate code for?",
          choices: [
            "Java",
            "Node.js",
            "PHP",
            "Python",
            "Ruby"
          ]
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

        var createBoilerplate = function() {
          console.log("Creating ".yellow + answers.runtime.blue + " boilerplate code for your project...".yellow);
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
              provideDetails();
              // process.exit();
            }
          }, 200 );
        };

        var provideDetails = function() {
          console.log("");
          console.log("Type ".blue + "cf push ".yellow + answers.project.yellow + " to test your application in Bluemix.".blue);
          process.exit(0);
        };

        // Start the chain of functions! Woohoo!
        createApplication();

      });
    }
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
    if (!loggedIn) {
      console.log("You need to log in to Bluemix to access that command.".blue);
      console.log("Please type ".blue + "ibmwatson login ".yellow + "to login to Bluemix.".blue);
    }
    else {
      console.log(library_table.toString());
    }
  });

program
  .command("addcontent")
  .description("Add content to your library (purchase or connect).")
  .action( function() {
    var connectOrPurchase = function() {
      var questions = [
        {
          type: "list",
          name: "method",
          message: "Would you like to purchase content or connect your own?",
          choices: [
            "Purchase content from the Watson Content Marketplace",
            "Connect your own (from SoftLayer, Amazon S3, Box.net)"
          ]
        }
      ];

      inquirer.prompt( questions, function( answers ) {
        if (answers.method == "Purchase content from the Watson Content Marketplace") {
          console.log("Opening Watson Content Marketplace in browser.");
          exec('open http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/content-marketplace.html');
        }
        else {
          connectContent();
        }
      });
    };

    var connectContent = function() {
      var questions = [
        {
          type: "list",
          name: "method",
          message: "How would you like to connect your content?",
          choices: [
            "SoftLayer",
            "Amazon S3",
            "Box.net",
            "Google Drive"
          ]
        }
      ];

      inquirer.prompt( questions, function( answers ) {
        switch (answers.method) {
          case "SoftLayer":
            contentLogin(answers.method);
            var softLayerContent = nconf.get('librarySoftLayer');
            for (var i = 0; i < softLayerContent.length; i++) {
              library.push(softLayerContent[i]);
            }
            nconf.set('library', library);
            nconf.save();
            break;
          case "Amazon S3":
            contentLogin(answers.method);
            break;
          case "Box.net":
            contentLogin(answers.method);
            break;
          case "Google Drive":
            contentLogin(answers.method);
            break;
        }
      });
    };

    var contentLogin = function(method) {
      var questions = [
        {
          type: "input",
          name: "username",
          message: "What is your " + method.gray + " username?"
        },
        {
          type: "password",
          message: "Please enter your " + method.gray + " password:",
          name: "password"
        }
      ];

      inquirer.prompt( questions, function( answers ) {
        // loggedIn = true;
        // nconf.set('loggedIn', loggedIn);
        // nconf.save();
        console.log("You have successfully connected to your " + method.yellow + " content.");
        // console.log( JSON.stringify(answers, null, "  ") );
      });
    };

    if (!loggedIn) {
      console.log("You need to log in to Bluemix to access that command.".blue);
      console.log("Please type ".blue + "ibmwatson login ".yellow + "to login to Bluemix.".blue);
    }
    else {
      connectOrPurchase();
    }
  });

program
  .command("docs")
  .description("Browse the Watson API Documentation.")
  .action (function() {
    console.log("Opening documentation in browser.");
     exec('open http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/');
  });

program
  .command("logs")
  .description("Browse logs for your Watson APIs.")
  .action (function() {
    console.log('Quota used!');
    console.log('Actual logs of specific requests!');
  });

program
  .command("resetlibrary")
  .description("Reset the Library to defaults (TESTING/DEMO PURPOSES ONLY).")
  .action (function() {
    console.log("Resetting library to defaults.");
    resetLibrary();
  });

program.parse(process.argv);

if (!program.args.length) program.help();


