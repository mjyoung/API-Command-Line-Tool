/*
    ===[ ibmwatson logs ]===
*/

program
  .command("logs")
  .description("Browse logs for your Watson APIs.")
  .option("--q, --quota", "Quota and usage data")
  .option("--r, --requests", "API request logs")
  .option("--e, --events", "User event logs")
  .action(function() {
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

