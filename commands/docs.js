/*
    ===[ ibmwatson docs ]===
*/

program
  .command("docs")
  .description("Browse Watson API documentation.")
  .action(function() {
    console.log("Opening documentation in browser.");
    exec('open http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/');
  });



