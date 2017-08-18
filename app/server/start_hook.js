// this module automatically ignores libraries loaded from node_modules
// automatically compile files on the fly
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

require('babel-register')({
    presets: ['es2015-node6']
});
require('./server.js');
