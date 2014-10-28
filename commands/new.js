/*
    ===[ ibmwatson new ]===
*/

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
