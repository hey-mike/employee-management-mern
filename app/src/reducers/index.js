import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import employeeState from './employee';
import departmentState from './department';
import notification from './notifications';

const EMSApp = combineReducers({
  employeeState,
  departmentState,
  notification,
  form: formReducer
});

export default EMSApp;
