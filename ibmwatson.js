#!/usr/bin/env node

/**
 * Module dependencies.
 */
var program     = require('commander');
var inquirer    = require('inquirer');
var Table       = require('cli-table');

/*
    cli-table includes colors:
        black, red, green, yellow, blue, magenta, cyan, white, gray, grey
    background colors:
        bgBlack, bgRed, bgGreen, bgYellow, bgBlue, bgMagenta, bgCyan, bgWhite
*/

var Chance      = require('chance');
var ProgressBar = require('progress');

var chance = new Chance();

/*
    ===[ WATSON LOGO (Array) ]===
*/
var watsonLogo = [
"                   oo",
"        oo.        oo        :+:",
"        :oo`       oo       -oo.",
"         :oo`      -:      .oo.",
".`        -:` `.::::::::.` .:.        `.",
"ooo/.      -/ooo/:../oo/soo+-`     ./ooo",
" .:ooo  `/oo/////o+/os++yoosss/`  ooo:.",
"    `. :so-     -/oo+++:s:  `-/o/ .`",
"      +ss   ..//-.oo  .:o+-    :oo`",
"     +os:  .yy-`:oo-    y-o++/  ooo",
"    -o//s`//` `soooo:yy/y:oooooooso:",
"    :o.`ysy///:/ooo/  -so  .-o+oo+o+",
"    :ooyyy-    :o: .. `y:..::+oo+:oo",
"    :o+s+:s-...oo:oooooso++:oo+o/.o:",
"    `oss:::/ssoo+:/++/y`-::oo- /o+o.",
"     .os-   +yso:   `o-`oooo:  :oo:",
"      .oo.    :oo-` +o+o+/+-  .oo:",
"       `/oo:::+o:sssss/.   .-/o/`",
"         `/ooooo/:s/`.:/ossso/`",
"            .:/+oss+++oo++:."
];


/*
    ===[ TABLES START ]===
*/

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

// table is an Array, so you can `push`, `unshift`, `splice` and friends
service_all_table.push(
    ['Concept Expansion', 'Maps euphemisms or colloquial terms to more commonly understood phrases.', 'Free, Standard, Premium'],
    ['Language Identification', 'Identifies the language in which text is written.', 'Free, Standard, Premium'],
    ['Machine Translation', 'Globalize on the fly. Translate text from one language to another.', 'Free, Standard, Premium'],
    ['Message Resonance', 'Communicate with people with a style and words that suits them.', 'Free, Standard, Premium'],
    ['Question and Answer', 'Direct responses to user inquiries fueled by primary document sources.', 'Free, Standard, Premium'],
    ['Relationship Extraction', 'Intelligently finds relationships between sentence components.', 'Free, Standard, Premium'],
    ['User Modeling', 'Improved understanding of user preferences and personality traits.', 'Free, Standard, Premium']
);

/*
    ===[ COMMANDS START ]===
*/

program
  .version("0.0.2");

program
  .command("new")
  .description("Create a new Watson project, which will house your individual API instances.")
  .action (function() {

    console.log('');
    for (var i = 0; i < watsonLogo.length; i++) {
      console.log(watsonLogo[i]);
    }
    console.log('');

    console.log("Hi, I'm Watson! I'm going to walk you through setting up your new project with the Watson APIs! \n".blue);

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
      },
      {
        type: "input",
        name: "project",
        message: "What would you like to name your project?"
      }

      // {
      //   type: "confirm",
      //   name: "toBeDelivered",
      //   message: "Is it for a delivery",
      //   default: false
      // },
      // {
      //   type: "input",
      //   name: "phone",
      //   message: "What's your phone number",
      //   validate: function( value ) {
      //     var pass = value.match(/^([01]{1})?[\-\.\s]?\(?(\d{3})\)?[\-\.\s]?(\d{3})[\-\.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i);
      //     if (pass) {
      //       return true;
      //     } else {
      //       return "Please enter a valid phone number";
      //     }
      //   }
      // },
      // {
      //   type: "list",
      //   name: "size",
      //   message: "What size do you need",
      //   choices: [ "Large", "Medium", "Small" ],
      //   filter: function( val ) { return val.toLowerCase(); }
      // },
      // {
      //   type: "input",
      //   name: "quantity",
      //   message: "How many do you need",
      //   validate: function( value ) {
      //     var valid = !isNaN(parseFloat(value));
      //     return valid || "Please enter a number";
      //   },
      //   filter: Number
      // },
      // {
      //   type: "expand",
      //   name: "toppings",
      //   message: "What about the toping",
      //   choices: [
      //     {
      //       key: "p",
      //       name: "Peperonni and chesse",
      //       value: "PeperonniChesse"
      //     },
      //     {
      //       key: "a",
      //       name: "All dressed",
      //       value: "alldressed"
      //     },
      //     {
      //       key: "w",
      //       name: "Hawaïan",
      //       value: "hawaian"
      //     }
      //   ]
      // },
      // {
      //   type: "rawlist",
      //   name: "beverage",
      //   message: "You also get a free 2L beverage",
      //   choices: [ "Pepsi", "7up", "Coke" ]
      // },
      // {
      //   type: "input",
      //   name: "comments",
      //   message: "Any comments on your purchase experience",
      //   default: "Nope, all good!"
      // },
      // {
      //   type: "list",
      //   name: "prize",
      //   message: "For leaving a comments, you get a freebie",
      //   choices: [ "cake", "fries" ],
      //   when: function( answers ) {
      //     return answers.comments !== "Nope, all good!";
      //   }
      // }
    ];

    inquirer.prompt( questions, function( answers ) {
      console.log("Answers");
      console.log( JSON.stringify(answers, null, "  ") );
    });
  });

program
  .command("catalog")
  .description("List all Watson APIs available in the catalog.")
  .action (function() {
    console.log(service_all_table.toString());
  });

program
  .command("docs")
  .description("Browse the Watson API Documentation.")
  .action (function() {
    console.log('Documentation!');
  });

program.parse(process.argv);

if (!program.args.length) program.help();
