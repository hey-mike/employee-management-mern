import express from 'express';
import bodyParser from 'body-parser';
import morgan from "morgan"
import { MongoClient,ObjectId  } from 'mongodb';
import path from 'path';
import mongoose from "mongoose";

import 'babel-polyfill';
import SourceMapSupport from 'source-map-support';

import IssueHelper from './issueHelper.js';
import issue from './routes/issue';
import employee from './routes/employee';

SourceMapSupport.install();

const app = express();
app.use(express.static('static'));
app.use(bodyParser.json());

//use logger
app.use(morgan("dev"));

//add routes
app.use('/api/issue', issue);
app.use('/api/employee', employee);

if (process.env.NODE_ENV !== 'production') {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');

    const config = require('../webpack.config');
    config.entry.app.push('webpack-hot-middleware/client', 'webpack/hot/only-dev-server');
    config.plugins.push(new webpack.HotModuleReplacementPlugin());

    const compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true
    }));
    app.use(webpackHotMiddleware(compiler, {
        log: console.log
    }));

    console.log('Enable webpackDevMiddleware and webpackHotMiddleware');
}


// It has to be placed at the end of all routes
app.get('*', (req, res) => {
    console.log('route to no where');
    res.sendFile(path.resolve('static/index.html'));
});

const server_port = 8080;
const uri = 'mongodb://localhost:27018/EMS';
mongoose.Promise = global.Promise;
mongoose.connect(uri, {useMongoClient:true}).then(connection => {
    console.log('monogdb connected')
    app.listen(server_port, () => {
        console.log('App started on port ' + server_port);
    });

}).catch(error => {
    console.log('ERROR:', error);
});;
