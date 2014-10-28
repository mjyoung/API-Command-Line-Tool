/*
    ===[ ibmwatson logout ]===
*/

program
  .command("logout")
  .description("Log out of Bluemix.")
  .action(function() {
    loggedIn = false;
    nconf.set('loggedIn', loggedIn);
    nconf.save();
    console.log("You have been logged out of Bluemix.");
  });