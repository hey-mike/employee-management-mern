// Invoke 'strict' JavaScript mode
'use strict';

// Set the 'development' environment configuration object
module.exports = {
	server: {
		port: 8080
	},
	db: {
		uri: 'mongodb://localhost:27018/EMS',
		options: {
			useMongoClient: true
		}
	}
};
