import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import App from './App.jsx';
// import IssueList from './IssueList.jsx';
import DeparmentPage from '../components/department/DepartmentPage.jsx';
import DeparmentEdit from '../components/department/DepartmentEdit.jsx';

import EmployeePage from '../components/employee/EmployeePage.jsx';
import EmployeeEdit from '../components/employee/EmployeeEdit.jsx';

import RelationPage from '../components/relation/RelationPage.jsx';

import IssueReport from '../components/dashboard/IssueReport.jsx';

import SchedulePage from '../components/schedule/SchedulePage.jsx';

const NoMatch = () => <p>Page Not Found</p>;

const Routes = () => (
  <Switch>
<<<<<<< HEAD
    <Redirect exact from="/" to="/schedule" />
=======
    <Redirect exact from="/" to="/relation" />
>>>>>>> 90c97ded6aa2b5bf70e02e153523fffe3482b28b
    <Route exact path="/dashboard" component={withRouter(IssueReport)} />

    <Route exact path="/relation" component={RelationPage} />

    <Route exact path="/department" component={withRouter(DeparmentPage)} />
    <Route exact path="/department/:id" component={withRouter(DeparmentEdit)} />

    <Route exact path="/employee" component={withRouter(EmployeePage)} />
    
    <Route exact path="/schedule" component={withRouter(SchedulePage)} />
    
    <Route component={NoMatch} />
  </Switch>
)
export default Routes;
