import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import employee from './employee';
import notification from './notifications';

const issueTrackerApp = combineReducers({
  employee,
  notification,
  form: formReducer
});

export default issueTrackerApp;
