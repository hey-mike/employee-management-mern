import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import App from './App.jsx';
// import IssueList from './IssueList.jsx';
import DeparmentPage from '../components/department/DepartmentPage.jsx';
import DeparmentEdit from '../components/department/DepartmentEdit.jsx';

import EmployeePage from '../components/employee/EmployeePage.jsx';
import EmployeeEdit from '../components/employee/EmployeeEdit.jsx';

import IssueReport from '../components/dashboard/IssueReport.jsx';

const NoMatch = () => <p>Page Not Found</p>;

const Routes = () => (
  <Switch>
    <Redirect exact from="/" to="/employee" />
    <Route exact path="/dashboard" component={withRouter(IssueReport)} />

    <Route exact path="/deparment" component={withRouter(DeparmentPage)} />
    <Route exact path="/deparment/:id" component={withRouter(DeparmentEdit)} />

    <Route exact path="/employee" component={withRouter(EmployeePage)} />
    <Route exact path="/employees/:id" component={EmployeeEdit} />
    
    <Route component={NoMatch} />
  </Switch>
)
export default Routes;
