/*
    ===[ ibmwatson adapt ]===
*/

program
  .command("adapt")
  .description("Adapt and configure the Watson APIs.")
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
          mrFilterAudience(true, "");
        }
        else if (method == "Ingest audience / process filter rules") {
          mrIngestFilters();
        }
        else if (method == "Show rules for audience") {
          mrShowRules();
        }
        else { //show ingested results
          mrShowIngestedAudience();
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

    var mrFilterAudience = function(firstTime, audience) {

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
        inquirer.prompt( questions, function( answers ) {
          switch (answers.filterType) {
            case "Keyword":
              mrAddFilterRule(audience, answers.filterType);
              break;
            case "#Hashtag":
              mrAddFilterRule(audience, answers.filterType);
              break;
            case "Language":
              mrAddFilterRule(audience, answers.filterType);
              break;
            case "Location":
              mrAddFilterRule(audience, answers.filterType);
              break;
            case "Date Range":
              mrAddFilterRule(audience, answers.filterType);
              break;
          }
        });
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

        console.log("You have created a filter: " + answers.newFilter.yellow);
        mrAddAnotherRule(audience);
      });
    };

    var mrAddAnotherRule = function(audience) {
      var questions = [
        {
          type: "confirm",
          name: "addAnother",
          message: "Would you like to add another filter to the audience " + audience.gray + "?"
        }
      ];

      inquirer.prompt( questions, function( answers ) {
        if (answers.addAnother) {
          mrFilterAudience(false, audience);
        }
        else {
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
          console.log("Your full list of filters for the audience " + audience.yellow + ":");
          console.log(filter_table.toString());
        }
      });
    };

    var mrIngestFilters = function() {
      var questions = [
        {
          type: "list",
          name: "audience",
          message: "Which audience would you like to ingest based on your filter rules?",
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

        var ingestFilters = function() {
          console.log("Ingesting your filters for the audience " + answers.audience.yellow);
          var ui = newBottomBar();
          var i = 4;

          var count = 1;
          var interval = setInterval(function() {
            ui.updateBottomBar( loader[i++ % 4] );
            count++;
            if (count == 25) {
              ui.updateBottomBar("Done ingesting.\n".green);
              process.exit(0);
            }
          }, 200 );
        };

        ingestFilters();
      });
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

    var mrShowIngestedAudience = function() {
      var questions = [
        {
          type: "list",
          name: "audience",
          message: "Which audience would you like to show results for?",
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
        console.log("Your filters for " + answers.audience.yellow + " are now using " + "30231".yellow + " tweets out of the full dataset of " + "54213".yellow + " tweets.");
        console.log("TODO: Show more content here.");
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