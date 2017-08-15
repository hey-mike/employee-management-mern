import React from 'react';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';
import { withRouter, Link } from 'react-router-dom';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';


import Drawer from './Drawer.jsx';
import AdminMenu from './AdminMenu.jsx';

const styleSheet = createStyleSheet(theme => ({
  root: {
    width: 'calc(100% - 250px)'
  },
  drawer: {
    flex: 0
  },
  flex: {
    flex: 1,
  }
}));

function Header(props) {
  const { classes, login } = props;
  return (
    <AppBar position="fixed" classes={{ root: classes.root }}>
      <Toolbar>
        <IconButton color="contrast">
          <MenuIcon />
        </IconButton>
        <Typography type="title" color="inherit" className={classes.flex}>
          Employee Management
          </Typography>
        {/* 
        <Button color="contrast" onClick={() => props.history.push('/issues')}>Employees</Button>
        <Button color="contrast" onClick={() => props.history.push('/reports')}>Reports</Button> */}
        <AdminMenu />
      </Toolbar>
    </AppBar>
  );
}


Header.prototypes = {
  showError: PropTypes.func.isRequired,
  showSuccess: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styleSheet)(Header));
