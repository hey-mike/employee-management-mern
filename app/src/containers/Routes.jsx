import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import App from './App.jsx';

import EmployeePage from '../components/EmployeePage.jsx';
import IssueEdit from '../components/IssueEdit.jsx';
import IssueReport from '../components/IssueReport.jsx';

const NoMatch = () => <p>Page Not Found</p>;

const Routes = () => (
  <div>
    <Switch>
      <Redirect exact from="/" to="/employees" />
            <Route exact path="/employees" component={withRouter(EmployeePage)} />
      <Route exact path="/reports" component={withRouter(IssueReport)} />
      <Route exact path="/employees/:id" component={IssueEdit} />
      <Route component={NoMatch} />
    </Switch>
  </div>
)
export default Routes;
