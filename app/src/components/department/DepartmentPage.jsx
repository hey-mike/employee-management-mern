
import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import qs from 'query-string';
import { Button, Glyphicon, Table, Panel, Pagination } from 'react-bootstrap';

// import EmployeeTable from './department-table/DepartmentTable.jsx'


const PAGE_SIZE = 10;
class DepartmentPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            departments: [],
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
            <div>
                {/* <EmployeeTable departments={this.props.departments} isFetching={this.props.isFetching} /> */}
            </div>
        );
    }
}
DepartmentPage.propTypes = {
    location: PropTypes.object.isRequired,
    departments: PropTypes.array.isRequired,
    totalCount: PropTypes.number.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
};


const mapStateToProps = (state, ownProps) => {
    const departmentState = state.departmentState;
    return {
        departments: departmentState.departments,
        totalCount: departmentState.totalCount,
        isFetching: departmentState.isFetching,
        lastUpdated: departmentState.lastUpdated,
        updatedEmployee: departmentState.updatedIssue,
    }
};

export default connect(mapStateToProps)(DepartmentPage);

