// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';

import DashboardIcon from 'material-ui-icons/Dashboard';
import ListIcon from 'material-ui-icons/List';
import ReportIcon from 'material-ui-icons/Report';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import AccountBalanceIcon from 'material-ui-icons/AccountBalance';
import ScheduleIcon from 'material-ui-icons/Schedule';


import classNames from 'classnames';
import AvatarImg from '../images/avatar.png'
import Avatar from 'material-ui/Avatar';

import Blue from 'material-ui/colors/blue';

const styleSheet = theme => ({
  list: {
    width: 250,
    flex: 'initial',
  },
  listFull: {
    width: 'auto',
    flex: 'initial',
  },
  profile: {
    // Name of the rule
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
  },
  profileItem: {
    paddingTop: 0,
    paddingBottom: 0
  },
  bigAvatar: {
    width: 50,
    height: 50,
  },
  sideMenu: {
    transform: "translate3d(0px, 0px, 0px)",
    transition: "width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms"
  }
});

class SideMenu extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: true,
      docked: true
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState({ open: true });
  }
  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const { classes, history, isDocked } = this.props;

    return (
      <Drawer
        docked
        open={isDocked}
        onClick={this.handleClose}
        style={{ zIndex: 10 }}
        classes={{ paper: classes.sideMenu }}
      >
        {/* <div className={classes.profile}>
          <List className={classes.list}>
            <ListItem>
              <Avatar
                alt="Adelle Charles"
                src={AvatarImg}
                className={classNames(classes.avatar, classes.bigAvatar)}
              />
            </ListItem>
            <ListItem className={classes.profileItem}>
              One Punch Man
            </ListItem>
            <ListItem className={classes.profileItem}>
              onepunch@gmail.com.au
            </ListItem>
          </List>
        </div> */}
        <List className={classes.list}>
          <ListItem button onClick={() => history.push('/dashboard')}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>

          <ListItem button onClick={() => history.push('/noitceboard')}>
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary="Noticeboard" />
          </ListItem>

          {/* <ListItem button onClick={() => history.push('/employee')}>
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary="Employees" />
          </ListItem>
           */}
          <ListItem button onClick={() => history.push('/relation')}>
            <ListItemIcon>
              <AccountBalanceIcon />
            </ListItemIcon>
            <ListItemText primary="Relations" />
          </ListItem>
          {/* 
          <ListItem button onClick={() => history.push('/department')}>
            <ListItemIcon>
              <ReportIcon />
            </ListItemIcon>
            <ListItemText primary="Deparment" />
          </ListItem> */}

          <ListItem button onClick={() => history.push('/schedule')}>
            <ListItemIcon>
              <ScheduleIcon />
            </ListItemIcon>
            <ListItemText primary="Schedule" />
          </ListItem>
        </List>
      </Drawer>
    );
  }
}

SideMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  isDocked: PropTypes.bool.isRequired,
  adjustWidth: PropTypes.string.isRequired,
}
const mapStateToProps = (state, ownProps) => {
  const interfaceState = state.interfaceState;
  return {
    adjustWidth: interfaceState.adjustWidth,
    isDocked: interfaceState.isDocked,
  }
};

export default withRouter(connect(mapStateToProps)(withStyles(styleSheet)(SideMenu)));
