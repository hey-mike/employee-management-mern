import React from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import Header from './Header.jsx';
import SideMenu from './SideMenu.jsx';

import Routes from './Routes.jsx';
import Notification from './Notification.jsx';

import Grid from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

const dockedWidth = 'calc(100% - 250px)';
const styleSheet = theme => ({
    right: {
        width: dockedWidth,
        float: 'right'
    },
    content: {
        transition: "width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
        paddingTop: 120
    }
});

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
                    <Routes/>
                </div>

                <Notification />
            </div >
        );
    }
}


export default withStyles(styleSheet)(App);
