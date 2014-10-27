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

## To-do:
* Longer commands:
* ibmwatson adapt --mr --hashtag "ios, osx, apple" --keyword "iphone" --location "brazil"
* ibmwatson new --name "Nike Basketball" --services "messageresonance, relationshipextraction" --runtime "nodejs"
* Adaptation testing
* Adaptation delete filters
* Show more detailed results

## Node packages used:
* [Commander.js](https://github.com/visionmedia/commander.js/)
* [Inquirer.js](https://github.com/SBoudrias/Inquirer.js/)
* [nconf](https://github.com/flatiron/nconf)
* [CLI Table](https://github.com/Automattic/cli-table)
* [colors.js](https://github.com/marak/colors.js)
* [Chance.js](https://github.com/victorquinn/chancejs)