
import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import qs from 'query-string';
import { Button, Glyphicon, Table, Panel, Pagination } from 'react-bootstrap';

import EmployeeTable from './EmployeeTable.jsx'


const PAGE_SIZE = 10;
class EmployeePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            employees: [],
            totalCount: 0,
        };
        this.setFilter = this.setFilter.bind(this);
    }


    setFilter(query) {
        let query_string = qs.stringify(query);
        this.props.history.push({ pathname: this.props.location.pathname, search: query_string })
    }


    selectPage(eventKey) {

        const query = Object.assign(this.props.location.search, { _page: eventKey });

        let query_string = qs.stringify({ _page: eventKey });

        this.props.history.push({ pathname: this.props.location.pathname, search: query_string })
    }
    render() {
        let initFilter = qs.parse(this.props.location.search);
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
    const employeesState = state.employeesState;
    return {
        employees: employeesState.employees,
        totalCount: employeesState.totalCount,
        isFetching: employeesState.isFetching,
        lastUpdated: employeesState.lastUpdated,
        updatedEmployee: employeesState.updatedIssue,
    }
};

export default connect(mapStateToProps)(EmployeePage);

