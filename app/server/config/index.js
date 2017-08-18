// Invoke 'strict' JavaScript mode
'use strict';

// Load the correct configuration file according to the 'NODE_ENV' variable
// console.log(process.env.NODE_ENV );
module.exports = require(`./env/${process.env.NODE_ENV}.js`);
