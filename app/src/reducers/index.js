import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import issuesState from './issues';
import employeesState from './employees';
import notification from './notifications';

const issueTrackerApp = combineReducers({
  issuesState,
  employeesState,
  notification,
  form: formReducer
});

export default issueTrackerApp;
