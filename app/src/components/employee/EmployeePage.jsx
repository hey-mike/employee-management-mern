
import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import qs from 'query-string';
import { Button, Glyphicon, Table, Panel, Pagination } from 'react-bootstrap';

import EmployeeTable from './employee-table/EmployeeTable.jsx'


const PAGE_SIZE = 10;
class EmployeePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            employees: [],
            totalCount: 0,
        };
    }  
    render() {
        return (
            <EmployeeTable employees={this.props.employees} isFetching={this.props.isFetching} />
        );
    }
}
EmployeePage.propTypes = {
    location: PropTypes.object.isRequired,
    employees: PropTypes.array.isRequired,
    totalCount: PropTypes.number.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
};


const mapStateToProps = (state, ownProps) => {
    const employeeState = state.employeeState;
    return {
        employees: employeeState.employees,
        totalCount: employeeState.totalCount,
        isFetching: employeeState.isFetching,
        lastUpdated: employeeState.lastUpdated,
        updatedEmployee: employeeState.updatedIssue,
    }
};

export default connect(mapStateToProps)(EmployeePage);

