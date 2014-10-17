#!/usr/bin/env node

/**
 * Can execute OS commands using below code
 */

var sys         = require('sys')
var nconf       = require('nconf');
var exec        = require('child_process').exec;

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

function puts(error, stdout, stderr) { sys.puts(stdout) }
// exec("ls", puts);

var resetDefaults = function() {
  var defaultLibrary = nconf.get('defaultLibrary');
  nconf.set('library', defaultLibrary);

  var defaultAdapt = nconf.get('defaultAdapt');
  nconf.set('adapt', defaultAdapt);
  nconf.save();
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
    console.log(service_all_table.toString());
  });

program
  .command("library")
  .description("List all content that you have purchased or uploaded.")
  .option("--a, --all", "List all API content")
  .option("--ce, --conceptexpansion", "Concept Expansion")
  .option("--li, --languageid", "Language Identification")
  .option("--mt, --machinetranslation", "Machine Translation")
  .option("--mr, --messageresonance", "Message Resonance")
  .option("--qa, --questionanswer", "Question and Answer")
  .option("--re, --relationshipextraction", "Relationship Extraction")
  .option("--um, --usermodeling", "User Modeling")
  .option("--vr, --visualizationrendering", "Visualization Rendering")
  .action( function() {
    var new_library_table = function(api) {
      var library_table = new Table({
        // chars: {'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': ''},
        chars: { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': ''
               , 'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': ''
               , 'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': ''
               , 'right': '' , 'right-mid': '' , 'middle': ' ' },
        head: ['SID'.cyan, 'CONTENT NAME'.cyan, 'DESCRIPTION'.cyan, 'APIs'.cyan],
        colWidths: [20,25,65,25]
      });

      var api_library = library[api]

      if (api == 'all') {
      // iterate through each key in the "library" hash and print out content
        for (var key in library) {
          if (library.hasOwnProperty(key)) {
            for (var i = 0; i < library[key].length; i++) {
              library_table.push(library[key][i]);
            }
          }
        }
        console.log(library_table.toString());
      }
      else if (api_library === undefined) {
      // there is no "library" content in config.json for the API specified
        console.log("No content in your library for the " + api.yellow + " API.");
      }
      else {
      // there is content in the "library" for the API specified
        var api_library = library[api]
        for (var i = 0; i < api_library.length; i++) {
          library_table.push(api_library[i]);
        }
        console.log(library_table.toString());
      }
    }

    var getLibrary = function() {
      if (program.args[0].all) { new_library_table('all'); }
      else if (program.args[0].conceptexpansion) { new_library_table('conceptexpansion'); }
      else if (program.args[0].languageid) { new_library_table('languageid'); }
      else if (program.args[0].machinetranslation) { new_library_table('machinetranslation'); }
      else if (program.args[0].messageresonance) { new_library_table('messageresonance'); }
      else if (program.args[0].questionanswer) { new_library_table('questionanswer'); }
      else if (program.args[0].relationshipextraction) { new_library_table('relationshipextraction'); }
      else if (program.args[0].usermodeling) { new_library_table('usermodeling'); }
      else if (program.args[0].visualizationrendering) { new_library_table('visualizationrendering'); }
      else { exec("ibmwatson library -h", puts); }
    }

    if (!loggedIn) {
      console.log("You need to log in to Bluemix to access that command.".blue);
      console.log("Please type ".blue + "ibmwatson login ".yellow + "to login to Bluemix.".blue);
    }
    else {
      getLibrary();
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
            // Add some dummy relationship extraction data
            contentLogin(answers.method);
            var softLayerContent = nconf.get('librarySoftLayer');
            for (var i = 0; i < softLayerContent.length; i++) {
              library['relationshipextraction'].push(softLayerContent[i]);
            }
            nconf.set('library', library);
            nconf.save();
            break;
          case "Amazon S3":
            contentLogin(answers.method);
            var amazonContent = nconf.get('libraryAmazon');
            for (var i = 0; i < amazonContent.length; i++) {
              library['messageresonance'].push(amazonContent[i]);
            }
            nconf.set('library', library);
            nconf.save();
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
        },
        {
          type: "input",
          message: "Which directory would you like to connect to?",
          name: "directory"
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
  // .command("adapt [action]")
  .command("adapt")
  .description("Adapt and configure the Watson APIs.")
  // .option("--ca, --createaudience <audience>", "Create Audience")
  .option("--ce, --conceptexpansion", "Concept Expansion")
  .option("--li, --languageid", "Language Identification")
  .option("--mt, --machinetranslation", "Machine Translation")
  .option("--mr, --messageresonance", "Message Resonance")
  .option("--qa, --questionanswer", "Question and Answer")
  .option("--re, --relationshipextraction", "Relationship Extraction")
  .option("--um, --usermodeling", "User Modeling")
  .option("--vr, --visualizationrendering", "Visualization Rendering")
  .action (function() {

    var adaptObject = nconf.get('adapt');

    var filter_table = new Table({
      chars: { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': ''
             , 'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': ''
             , 'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': ''
             , 'right': '' , 'right-mid': '' , 'middle': ' ' },
      head: ['FID'.cyan, 'AUDIENCE'.cyan, 'FILTER TYPE'.cyan, 'FILTER RULE'.cyan],
      colWidths: [5,24,15,60]
    });

    var adaptContent = function() {
      if (program.args[0].conceptexpansion) {  }
      else if (program.args[0].languageid) {  }
      else if (program.args[0].machinetranslation) {  }
      else if (program.args[0].messageresonance) {
        adaptMR();
      }
      else if (program.args[0].questionanswer) {  }
      else if (program.args[0].relationshipextraction) {  }
      else if (program.args[0].usermodeling) {  }
      else if (program.args[0].visualizationrendering) {  }
      else {
        // console.log(program.args);
        exec("ibmwatson adapt -h", puts);
      }
      // console.log(program.args[1].visualizationrendering);
    };


    var mrLibrary = library['messageresonance'];
    var mrLibraryNames = [];
    for (var i = 0; i < mrLibrary.length; i++) {
      mrLibraryNames.push(mrLibrary[i][1]);
    }

    var adaptMR = function() {
      var questions = [
        {
          type: "list",
          name: "method",
          message: "How would you like to adapt " + "Message Resonance".gray + "?",
          choices: [
            "Create audience dataset",
            "Create filter rules for audience",
            "Ingest audience / process filter rules",
            "Show rules for audience",
            "Show ingested results for audience"
          ]
        }
      ];

      inquirer.prompt( questions, function( answers ) {
        var method = answers.method;

        if (method == "Create audience dataset") {
          mrCreateAudience();
        }
        else if (method == "Create filter rules for audience") {
          mrFilterAudience(true);
        }
        else if (method == "Ingest audience / process filter rules") {
          mrIngestFilters();
        }
        else if (method == "Show rules for audience") {
          mrShowRules();
        }
        else {

        }

      });
    };

    var mrCreateAudience = function() {

      var questions = [
        {
          type: "checkbox",
          name: "method",
          message: "Select content from your " + "Message Resonance".gray + " library to base an audience dataset on:",
          choices: mrLibraryNames,
          validate: function( answer ) {
            if ( answer.length < 1 ) {
              return "You must choose at least one content source.";
            }
            return true;
          }
        },
        {
          type: "input",
          name: "audienceName",
          message: "What would you like to name this audience?"
        },
        {
          type: "input",
          name: "audienceDescription",
          message: "Please enter a brief description for this audience."
        }
      ];

      inquirer.prompt( questions, function( answers ) {
        var newSID = chance.hash({length: 10});

        console.log("You have created the audience:");
        console.log("Name:         ".cyan + answers.audienceName);
        console.log("Description:  ".cyan + answers.audienceDescription);
        console.log("SID:          ".cyan + newSID);
        console.log("");
        console.log("You can now add filter rules to apply to this audience: " + "ibmwatson adapt --mr".yellow);
        console.log("You can see your full list of available audience datasets: " + "ibmwatson library --mr".yellow);
        var newMRaudience = [newSID, answers.audienceName, answers.audienceDescription, "Message Resonance"];
        library['messageresonance'].push(newMRaudience);
        nconf.set('library', library);
        nconf.save();

      });
    };

    var mrFilterAudience = function(firstTime) {

      var questions = [
        {
          type: "list",
          name: "filterType",
          message: "What type of filter rule would you like to apply?",
          choices: [
            "Keyword",
            "#Hashtag",
            "Language",
            "Location",
            "Date Range"
          ],
          validate: function( answer ) {
            if ( answer.length < 1 ) {
              return "You must choose at least one filter type.";
            }
            return true;
          }
        }
      ];

      if (firstTime) {
        var firstQuestion = {
          type: "list",
          name: "audience",
          message: "Which audience would you like to create filter rules for?",
          choices: mrLibraryNames,
          validate: function( answer ) {
            if ( answer.length < 1 ) {
              return "You must choose at least one audience.";
            }
            return true;
          }
        };
        questions.unshift(firstQuestion);

        inquirer.prompt( questions, function( answers ) {
          switch (answers.filterType) {
            case "Keyword":
              mrAddFilterRule(answers.audience, answers.filterType);
              break;
            case "#Hashtag":
              mrAddFilterRule(answers.audience, answers.filterType);
              break;
            case "Language":
              mrAddFilterRule(answers.audience, answers.filterType);
              break;
            case "Location":
              mrAddFilterRule(answers.audience, answers.filterType);
              break;
            case "Date Range":
              mrAddFilterRule(answers.audience, answers.filterType);
              break;
          }
        });
      }
      else {

      }
    };

    var mrAddFilterRule = function(audience, filterType) {
      var questions = [
        {
          type: "input",
          name: "newFilter",
          message: "Create your filter for " + filterType.gray
        }
      ];

      inquirer.prompt( questions, function( answers ) {
        adaptObject.messageresonance.filterCount += 1;
        adaptObject.messageresonance.filters.push([adaptObject.messageresonance.filterCount, audience, filterType, answers.newFilter]);
        nconf.set('adapt', adaptObject);
        nconf.save();

        for (var i = 0; i < adaptObject.messageresonance.filters.length; i++) {
          if (adaptObject.messageresonance.filters[i][1] == audience) {
            filter_table.push([
              adaptObject.messageresonance.filters[i][0],
              adaptObject.messageresonance.filters[i][1],
              adaptObject.messageresonance.filters[i][2],
              adaptObject.messageresonance.filters[i][3]
            ]);
          }
        }

        console.log("You have created a filter: " + answers.newFilter.yellow);
        console.log("Your full list of filters for the audience " + audience.yellow + ":");
        console.log(filter_table.toString());
        // console.log(adaptObject.messageresonance.filters);
      });

    };

    var mrIngestFilters = function() {
      var questions = [
        {
          type: "list",
          name: "audience",
          message: "Which audience would you like to show rules for?",
          choices: mrLibraryNames,
          validate: function( answer ) {
            if ( answer.length < 1 ) {
              return "You must choose at least one audience.";
            }
            return true;
          }
        }
      ];
    };

    var mrShowRules = function() {
      var questions = [
        {
          type: "list",
          name: "audience",
          message: "Which audience would you like to show rules for?",
          choices: mrLibraryNames,
          validate: function( answer ) {
            if ( answer.length < 1 ) {
              return "You must choose at least one audience.";
            }
            return true;
          }
        }
      ];

      inquirer.prompt( questions, function( answers ) {

        for (var i = 0; i < adaptObject.messageresonance.filters.length; i++) {
          if (adaptObject.messageresonance.filters[i][1] == answers.audience) {
            filter_table.push([
              adaptObject.messageresonance.filters[i][0],
              adaptObject.messageresonance.filters[i][1],
              adaptObject.messageresonance.filters[i][2],
              adaptObject.messageresonance.filters[i][3]
            ]);
          }
        }

        console.log(filter_table.toString());
        // console.log(adaptObject.messageresonance.filters);
      });
    };

    if (!loggedIn) {
      console.log("You need to log in to Bluemix to access that command.".blue);
      console.log("Please type ".blue + "ibmwatson login ".yellow + "to login to Bluemix.".blue);
    }
    else {
      adaptContent();
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
  .option("--q, --quota", "Quota and usage data")
  .option("--r, --requests", "API request logs")
  .option("--e, --events", "User event logs")
  .action (function() {
    var logs = nconf.get('logs');
    if (program.args[0].quota) {
      // ibmwatson logs --quota

      /* Total requests for all APIs */
      var log_table = new Table({
        chars: { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': ''
               , 'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': ''
               , 'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': ''
               , 'right': '' , 'right-mid': '' , 'middle': ' ' }
      });

      console.log("All APIs:");
      log_table.push(
        ["Avg requests per day (last 7 days)".cyan, logs.usage.reqperday],
        ["Last 24 hours".cyan, logs.usage.lastday],
        ["Last 7 days".cyan, logs.usage.last7days],
        ["Last 30 days".cyan, logs.usage.last30days]
      );
      console.log(log_table.toString() + "\n");

      /* Quota data for each API by percentage */
      var log_percentage_table = new Table({
        chars: { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': ''
               , 'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': ''
               , 'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': ''
               , 'right': '' , 'right-mid': '' , 'middle': ' ' }
      });

      console.log("Quota used by API:");
      for (var i = 0; i < logs.usage.quota.length; i++) {
        log_percentage_table.push(
          [logs.usage.quota[i].api.cyan, logs.usage.quota[i].quota]
        );
      }
      console.log(log_percentage_table.toString() + "\n");
    }

    if (program.args[0].requests) {
      // ibmwatson logs --requests

      var request_table = new Table({
        chars: { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': ''
               , 'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': ''
               , 'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': ''
               , 'right': '' , 'right-mid': '' , 'middle': ' ' },
        head: ['DATE'.cyan, 'API'.cyan, 'REQUEST'.cyan],
        colWidths: [20,25,60]
      });

      for (var i = 0; i < logs.requests.length; i++) {
        request_table.push([
          logs.requests[i].date, logs.requests[i].api, logs.requests[i].request
        ]);
      }
      console.log("API Requests:");
      console.log(request_table.toString() + "\n");
    }

    if (program.args[0].events) {
      // ibmwatson logs --events

      var events_table = new Table({
        chars: { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': ''
               , 'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': ''
               , 'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': ''
               , 'right': '' , 'right-mid': '' , 'middle': ' ' },
        head: ['DATE'.cyan, 'USER'.cyan, 'EVENT'.cyan],
        colWidths: [20,25,60]
      });

      for (var i = 0; i < logs.events.length; i++) {
        events_table.push([
          logs.events[i].date, logs.events[i].user, logs.events[i].event
        ]);
      }
      console.log("User event logs:");
      console.log(events_table.toString() + "\n");
    }

    if (!program.args[0].quota && !program.args[0].requests && !program.args[0].events) {
      exec("ibmwatson logs -h", puts);
    }
  });

program
  .command("resetdefaults")
  .description("Reset the config file to defaults (TESTING/DEMO PURPOSES ONLY).")
  .action (function() {
    console.log("Resetting config file to defaults.");
    resetDefaults();
  });

program.parse(process.argv);

if (!program.args.length) program.help();


