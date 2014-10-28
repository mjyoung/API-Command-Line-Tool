/*
    ===[ ibmwatson catalog ]===
*/

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