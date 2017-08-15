import React from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import Header from '../components/Header.jsx';
import Routes from './Routes.jsx';
import Notification from './Notification.jsx';
import SideMenu from '../components/SideMenu.jsx';
import Grid from 'material-ui/Grid'
import { withStyles, createStyleSheet } from 'material-ui/styles';
import classNames from 'classnames';

const styleSheet = createStyleSheet(theme => ({
    right: {
        width: 'calc(100% - 250px)',
        float: 'right'
    },
    content: {
        padding: theme.spacing.unit * 2,
        paddingTop: 80
    }
}));

// withRouter IssueList can use this.props.router to access the router object.(this.props.location)
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const classes = this.props.classes;

        return (
            <div>
                <SideMenu />
                <Header className={classes.right} />
                <div className={classNames(classes.content, classes.right)}>
                    <Routes />
                </div>

                <Notification />
            </div >
        );
    }
}

export default withStyles(styleSheet)(App);
