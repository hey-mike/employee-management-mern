import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import App from './App.jsx';
// import IssueList from './IssueList.jsx';
import EmployeePage from '../components/EmployeePage.jsx';
import EmployeeEdit from '../components/EmployeeEdit.jsx';
import IssueReport from '../components/IssueReport.jsx';

const NoMatch = () => <p>Page Not Found</p>;

const Routes = () => (
  <Switch>
    <Redirect exact from="/" to="/employees" />
    <Route exact path="/employees" component={withRouter(EmployeePage)} />
    <Route exact path="/reports" component={withRouter(IssueReport)} />
    <Route exact path="/employees/:id" component={EmployeeEdit} />
    <Route component={NoMatch} />
  </Switch>
)
export default Routes;
