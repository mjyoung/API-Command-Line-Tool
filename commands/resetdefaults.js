/*
    ===[ ibmwatson resetdefaults ]===
*/

program
  .command("resetdefaults")
  .description("Reset the config file to defaults (TESTING/DEMO PURPOSES ONLY).")
  .action (function() {
    console.log("Resetting config file to defaults.");
    resetDefaults();
  });