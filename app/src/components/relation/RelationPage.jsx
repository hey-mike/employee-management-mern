
import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import qs from 'query-string';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

import { withStyles } from 'material-ui/styles';

import DepartmentTable from '../department/department-table/DepartmentTable.jsx'
import EmployeeTable from '../employee/employee-table/EmployeeTable.jsx'


function TabContainer(props) {
    return (
        <div style={{ padding: 20 }}>
            {props.children}
        </div>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};


const styleSheet = theme => ({
    root: {
        transition: "width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms"
      },
});
class RelationPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            departments: [],
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
        const style = {
            width:this.props.adjustWidth,
            top:64
        }
        const { classes, login ,isDocked} = this.props;
        return (
            <div>
                <AppBar position="fixed" color="default" style={style} classes={{ root: classes.root }}>
                    <Tabs
                        value={this.state.value}
                        onChange={(event, value) => this.handleChange(event, value)}
                        indicatorColor="primary"
                        textColor="primary"
                        fullWidth
                    >
                        <Tab label="Departments" />
                        <Tab label="Empolyees" />
                        <Tab label="Teams" disabled />
                    </Tabs>
                </AppBar>
                <SwipeableViews index={this.state.value} onChangeIndex={index => this.handleChangeIndex(index)}>
                    <TabContainer>
                        <DepartmentTable />
                    </TabContainer>
                    <TabContainer>
                        <EmployeeTable />
                    </TabContainer>
                </SwipeableViews>
            </div>
        );
    }
}
RelationPage.propTypes = {
    isDocked: PropTypes.bool.isRequired,
    adjustWidth: PropTypes.string.isRequired,
};


const mapStateToProps = (state, ownProps) => {
    const interfaceState = state.interfaceState;
    return {
        adjustWidth: interfaceState.adjustWidth,
        isDocked: interfaceState.isDocked,
    }
};

export default connect(mapStateToProps)(withStyles(styleSheet)(RelationPage));

