import React from 'react';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { openDrawer, closeDrawer } from '../actions/drawerActions'

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ExitToAppIcon from 'material-ui-icons/ExitToApp';
import ChatBubbleIcon from 'material-ui-icons/ChatBubble';

import Badge from 'material-ui/Badge';



import Drawer from '../components/Drawer.jsx';
import AdminMenu from '../components/AdminMenu.jsx';

const styleSheet = theme => ({
  root: {
    // transform: "translate3d(0px, 0px, 0px)",
    transition: "width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms"

  },
  drawer: {
    flex: 0
  },
  flex: {
    flex: 1,
  },
  badge: {
    margin: `0 ${theme.spacing.unit * 2}px`,
    width: "100%",
    display: "flex",
    alignItems: "inherit",
    justifycontent: "inherit",
  },
});

function Header(props) {
  const { classes, login ,isDocked} = props;

  const newRoot = {
    width: props.adjustWidth
  };
  // console.log("newRoot",newRoot);
  // console.log("classes.root",classes.root);

  return (
    // <AppBar position="fixed" classes={{ root: classes.root }}>
    <AppBar position="fixed" style={newRoot} classes={{ root: classes.root }}>
      <Toolbar>
        <IconButton color="contrast" aria-label="Menu" onClick={() => {
          if(isDocked) props.dispatch(closeDrawer());
          else props.dispatch(openDrawer());
        }}>
          <MenuIcon />
        </IconButton>
        <Typography type="title" color="inherit" className={classes.flex}>
          Employee Management
          </Typography>

        <IconButton color="contrast" onClick={() => props.history.push('/issues')}>
          <Badge className={classes.badge} badgeContent={4} color="accent">
            <ChatBubbleIcon />
          </Badge>
        </IconButton>
        <IconButton color="contrast" onClick={() => props.history.push('/reports')}> <ExitToAppIcon /></IconButton>
        {/* <AdminMenu /> */}
      </Toolbar>
    </AppBar>
  );
}


Header.prototypes = {
  showSuccess: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
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

export default withRouter(connect(mapStateToProps)(withStyles(styleSheet)(Header)));
