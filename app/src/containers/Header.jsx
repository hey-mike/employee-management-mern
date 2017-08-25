import React from 'react';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';
import { withRouter, Link } from 'react-router-dom';

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
    width: 'calc(100% - 250px)'
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
  const { classes, login } = props;
  return (
    <AppBar position="fixed" classes={{ root: classes.root }}>
      <Toolbar>
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
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styleSheet)(Header));
