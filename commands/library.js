/*
    ===[ ibmwatson library ]===
*/

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