import express from 'express';
import bodyParser from 'body-parser';
import morgan from "morgan"
import path from 'path';
import SourceMapSupport from 'source-map-support';
SourceMapSupport.install();

import issue from '../routes/issue';
import index from '../routes/index';
import department from '../routes/department';
import employee from '../routes/employee';


module.exports = function (db) {
    const app = express();
    app.use(express.static('static'));
    app.use(bodyParser.json());

    //use logger
    app.use(morgan("dev"));

    //add routes
    // It has to be placed at the end of all routes
    app.get('/', index);
    app.use('/api/issue', issue);
    app.use('/api/department', department);
    app.use('/api/employee', employee);


    if (process.env.NODE_ENV !== 'production') {
        // import only support top level
        const webpack = require('webpack');
        const webpackDevMiddleware = require('webpack-dev-middleware');
        const webpackHotMiddleware = require('webpack-hot-middleware');

        const config = require('../../webpack.config');
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


    return app;
}
