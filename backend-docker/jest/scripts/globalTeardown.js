/* Global teardown modle.
 **
 ** This module exports an async function that is triggered
 ** once after all test suites.
 **
 */

const chalk = require('chalk');

/* eslint-disable */
module.exports = async function() {
    console.log(chalk.red('λ'));
};
