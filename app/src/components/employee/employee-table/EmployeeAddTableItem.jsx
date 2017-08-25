import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createEmployee } from '../../../actions/employeeActions'
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import Add from 'material-ui-icons/Add';
import TextField from 'material-ui/TextField';
import FormControl from 'material-ui/Form/FormControl';



import AddEmployeeForm from '../forms/AddEmployeeForm.jsx';

const styleSheet = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  dialog: {
    width: "100%"
  }
});


class EmployeeAddTableItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showing: false,

    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.submit = this.submit.bind(this);
  }
  showModal() {
    this.setState({ open: true });
  }
  hideModal() {
    this.setState({ open: false });
  }

  submit(values) {
    // e.preventDefault();
    this.hideModal();

    const newEmployee = {
      name: values.name,
      title: values.title,
      status: 'New',
      created: new Date(),
    };

    this.props.dispatch(createEmployee(newEmployee, this.props.history));
  }

  render() {
    const classes = this.props.classes;
    return (
      <div>
        <IconButton aria-label="Add issue" onClick={this.showModal}>
          <Add />
        </IconButton>
        <Dialog open={this.state.open} classes={{ paper: classes.dialog }} onRequestClose={this.handleRequestClose}>
          <DialogTitle>
            {"Create Employee"}
          </DialogTitle>
          <DialogContent>
            <AddEmployeeForm handleCancel={this.hideModal} onSubmit={this.submit} />
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}
EmployeeAddTableItem.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const { updatedEmployee, error } = state.employeeState;
  return {
    updatedEmployee: updatedEmployee,
    error: error,
  }
};

const componentWithStyles = withStyles(styleSheet)(EmployeeAddTableItem);
export default withRouter(connect(mapStateToProps)(componentWithStyles));
