// @flow weak
/* eslint-disable react/no-multi-comp */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchDepartments } from '../../../actions/departmentActions'

import { withStyles } from 'material-ui/styles';
import keycode from 'keycode';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';

import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import { LinearProgress } from 'material-ui/Progress';

import EnhancedTableHead from './EnhancedTableHead.jsx';
import EnhancedTableToolbar from './EnhancedTableToolbar.jsx';
// import EnhancedTableFooter from './EnhancedTableFooter.jsx';


const DepartmentRow = (props) => {
  function onDeleteClick() {
    props.deleteIssue(props.department);
  }
  const { department, isSelected } = props;

  return (
    <TableRow
      hover
      onClick={event => props.handleClick(event, department._id)}
      onKeyDown={event => props.handleKeyDown(event, department._id)}
      role="checkbox"
      aria-checked={isSelected}
      tabIndex="-1"
      key={department._id}
      selected={isSelected}
    >
      <TableCell checkbox>
        <Checkbox checked={isSelected} />
      </TableCell>
      <TableCell><Link to={`/departments/${department._id}`}>
        {department._id.substr(-4)}</Link></TableCell>
      <TableCell>{department.name}</TableCell>
      <TableCell>{department.manager}</TableCell>
      <TableCell>{department.createdAt.toDateString()}</TableCell>
    </TableRow>
  )
}
DepartmentRow.propTypes = {
  department: PropTypes.object.isRequired,
};


const styleSheet = theme => ({
  paper: {
    width: '100%',
    overflowX: 'auto',
  },
  progress: {
    width: '100%',
    height: 2
  }
});
const columnData = [
  { id: 'id', numeric: false, disablePadding: false, label: 'Id' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'manager', numeric: false, disablePadding: false, label: 'Manager' },
  { id: 'createdAt', numeric: false, disablePadding: false, label: 'Created' }
];
class NoticeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: 'asc',
      orderBy: 'created',
      selected: [],
      pageSize: 10,
      pageNum: 1
    };

    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.handleSelectAllClick = this.handleSelectAllClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.setFilter = this.setFilter.bind(this);
    this.selectPage = this.selectPage.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchDepartments(this.props.location, this.state.pageSize));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search != this.props.location.search) {
      const { departments } = this.props;
      this.props.dispatch(fetchDepartments(this.props.location, this.state.pageSize));
    }
  }

  setFilter(query) {
    let query_string = qs.stringify(query);
    this.props.history.push({ pathname: this.props.location.pathname, search: query_string })
  }


  selectPage(eventKey) {
    // console.log('location', this.props.location.search);
    const query = Object.assign(this.props.location.search, { _page: eventKey });
    // console.log('selectPage', query);
    let query_string = qs.stringify({ _page: eventKey });
    // console.log('qs', qs);
    this.props.history.push({ pathname: this.props.location.pathname, search: query_string })
  }
  handleRequestSort(event, property) {

    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const departments = this.props.departments.sort(
      (a, b) => (order === 'desc' ? b[orderBy] > a[orderBy] : a[orderBy] > b[orderBy]),
    );

    this.setState({ departments, order, orderBy });
  };

  handleSelectAllClick(event, checked) {
    if (checked) {
      this.setState({ selected: this.props.departments.map(departments => departments._id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleKeyDown(event, id) {
    if (keycode(event) === 'space') {
      this.handleClick(event, id);
    }
  };

  handleClick(event, id) {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  isSelected(id) {
    return this.state.selected.indexOf(id) !== -1;
  }

  render() {
    const { classes, isFetching ,departments} = this.props;
    const { order, orderBy, selected } = this.state;
    departments.map(department => {
      if(department == undefined) console.log('department');
    })
    const departmentRows = departments.map(department => <DepartmentRow key={department._id} department={department} isSelected={this.isSelected(department._id)}
      handleClick={this.handleClick} handleKeyDown={this.handleKeyDown} />)


    return (
      <Paper className={classes.paper}>
        <EnhancedTableToolbar title="Departments" selected={selected} deleteIssue={this.deleteIssue} />
        {isFetching && <LinearProgress className={classes.progress} />}
        <Table>
          <EnhancedTableHead
            columnData={columnData}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={this.handleSelectAllClick}
            onRequestSort={this.handleRequestSort}
            checked={selected.length == this.state.pageSize}
          />
          <TableBody>{departmentRows}</TableBody>
        </Table>
      </Paper>
    );
  }
}

NoticeTable.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  departments: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};
const mapStateToProps = (state, ownProps) => {
  const { departments, isFetching, lastUpdated, deletedEmployees, pageSize, pageNum, offset } = state.departmentState;
  return {
    departments: departments,
    isFetching: isFetching,
    lastUpdated: lastUpdated,
    deletedEmployees: deletedEmployees,
    pageNum: pageNum,
    offset: offset
  }
};


const componentWithStyles = withStyles(styleSheet)(NoticeTable);
export default withRouter(connect(mapStateToProps)(componentWithStyles));
