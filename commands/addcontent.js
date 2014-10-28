/*
    ===[ ibmwatson addcontent ]===
*/

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
            // Add some dummy message resonance data
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