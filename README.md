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

## Node packages used:
* [Commander.js](https://github.com/visionmedia/commander.js/)
* [Inquirer.js](https://github.com/SBoudrias/Inquirer.js/)
* [nconf](https://github.com/flatiron/nconf)
* [CLI Table](https://github.com/Automattic/cli-table)
* [colors.js](https://github.com/marak/colors.js)
* [Chance.js](https://github.com/victorquinn/chancejs)



1. Create Audience
Input: Name
Input: URL to raw content
Input: Data source type (enumerated – GNIP, etc.)
Output: ID for audience

2. Filter audience
Input: ID for audience
Input: Filtering rules

hashtag, language, location, word exclusion

3. Ingest Audience
Input: ID for audience

4. Show rules
Input: ID for audience
Output: Rules file
Output: # of users meeting filter requirements.
Output: Total # of users in raw content.
Output: # of tweets meeting filter requirements.
Output: Total # of tweets.

5. Black list individual tweets.

6. Show ingested index (all words with scores based on filters).
Input: ID for audience
Output: Ingested index


ibmwatson adapt --messageresonance (???)