import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import employeesState from './employees';
import notification from './notifications';

const issueTrackerApp = combineReducers({
  employeesState,
  notification,
  form: formReducer
});

export default issueTrackerApp;
