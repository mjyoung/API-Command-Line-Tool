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
The Watson API CLI is not intended to hand-hold a brand new user through the application and API set up process. It is intended to allow seasoned users to do tasks more efficiently by using the command-line.

## Node packages used:
* Inquirer.js
* Commander.js
* Chance.js
* colors
* cli-table

## Credit
Code originally borrowed [ :) ] and modified from Brian Han's [rinder/Docker CLI](https://git.design.ibm.com/bthan/rinder-cli/) project.