# IBM Watson API CLI
### A prototype for the IBM Watson API command-line experience.

## Installation
`npm install -g ibmwatson`

## Description
The Watson API Command-Line Interface should allow a user (developer) to:

* Login and create applications in Bluemix
* Create Watson API instances in Bluemix
* Generate boilerplate code based on developer-defined APIs
* View the full catalog of Watson APIs
* View the content available in the Watson Content Marketplace
* View the purchased and uploaded content in the user's Library
* Add content from AWS, SoftLayer, etc.
* Adapt an API to the developer's use case

Note:
The Watson API CLI is not necessarily intended to hand-hold a first-time user through the application and API set up process. It is intended to allow seasoned users to do tasks more efficiently by using the command-line.

## Usage
In the command line, type `ibmwatson` for a list of commands.

## Development Tips
* Create a separate file within the commands directory for each command, then include it at the top of the ibmwatson.js file. The list of commands in `ibmwatson --help` is displayed in the order that you `require` the files in.
* Get familiar with Inquirer.js and all of the different types of input prompts you can have.
* If you need to persist any sort of data (such as content library, adaptation rules, whether or not the user is logged in), you can do it within `config.json` using `nconf`. Very useful!
* When developing, be sure to `npm link` from within the working directory. This links your working directory to your `ibmwatson` npm package, which allows you to see your changes locally as you make them without having to `npm publish` and `npm install -g ibmwatson` each time.

## To-do:
* Longer commands:
* ibmwatson adapt --mr --hashtag "ios, osx, apple" --keyword "iphone" --location "brazil"
* ibmwatson new --name "Nike Basketball" --services "messageresonance, relationshipextraction" --runtime "nodejs"
* Adaptation testing
* Adaptation delete filters
* Show more detailed results

## Node packages used:
* [Commander.js](https://github.com/visionmedia/commander.js/) - framework for commands and options.
* [Inquirer.js](https://github.com/SBoudrias/Inquirer.js/) - for Yeoman-style question prompt system.
* [nconf](https://github.com/flatiron/nconf) - loading and setting persistent config data in config.json.
* [CLI Table](https://github.com/Automattic/cli-table) - table formatting in the command-line.
* [colors.js](https://github.com/marak/colors.js) - duh, colors!
* [Chance.js](https://github.com/victorquinn/chancejs) - randomly generate lots of different stuff.

[IBM Release Blueprints](https://releaseblueprints.ibm.com/display/WDA/Command-Line+Interface)
