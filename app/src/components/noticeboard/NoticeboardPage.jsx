
import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import qs from 'query-string';
import Tabs, { Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

import NoticeTable from './notice-table/NoticeTable.jsx'


class NoticeboardPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notices: [],
            totalCount: 0,
            value: 0
        };
        this.setFilter = this.setFilter.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeIndex = this.handleChangeIndex.bind(this);
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

    handleChange(event, value) {
        this.setState({ value });
    }
    handleChangeIndex(index) {
        this.setState({ value: index });
    };
    render() {
        return (
            <div>
                <EmployeeTable />
            </div>
        );
    }
}
NoticeboardPage.propTypes = {
    location: PropTypes.object.isRequired,
    notices: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
};


const mapStateToProps = (state, ownProps) => {
    const noticeState = state.noticeState;
    return {
        notices: noticeState.notices,
        isFetching: noticeState.isFetching,
        lastUpdated: noticeState.lastUpdated,
        updatedNotice: noticeState.updatedIssue,
    }
};

export default connect(mapStateToProps)(NoticeboardPage);

