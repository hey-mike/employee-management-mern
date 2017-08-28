
import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import qs from 'query-string';

import ScheduleGanttChart from './ScheduleGanttChart.jsx'

class SchedulePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            employees: [],
            totalCount: 0,
        };
    }
  
    render() {
        return (
            <ScheduleGanttChart />
        );
    }
}
SchedulePage.propTypes = {
    location: PropTypes.object.isRequired,
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

export default connect(mapStateToProps)(SchedulePage);

