
import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import qs from 'query-string';
import Tabs, { Tab } from 'material-ui/Tabs';
import DepartmentTable from './department-table/DepartmentTable.jsx'


class DepartmentPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            departments: [],
            totalCount: 0,
            menu: 0
        };
        this.setFilter = this.setFilter.bind(this);
        this.handleChange = this.handleChange.bind(this);
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

    handleChange(event, menu) {
        this.setState({ menu });
    }
    render() {
        return (
            <div>
                <Tabs
                    value={this.state.menu}
                    onChange={(event, menu) => this.handleChange(event,menu)}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Departments" />
                    <Tab label="Empolyees" />
                    <Tab label="Teams" />
                </Tabs>
                <DepartmentTable departments={this.props.departments} isFetching={this.props.isFetching} />
            </div>
        );
    }
}
DepartmentPage.propTypes = {
    location: PropTypes.object.isRequired,
    departments: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
};


const mapStateToProps = (state, ownProps) => {
    const departmentState = state.departmentState;
    return {
        departments: departmentState.departments,
        isFetching: departmentState.isFetching,
        lastUpdated: departmentState.lastUpdated,
        updatedDepartment: departmentState.updatedIssue,
    }
};

export default connect(mapStateToProps)(DepartmentPage);

