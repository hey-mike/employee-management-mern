import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import interfaceState from './interface';
import employeeState from './/employee';
import departmentState from './department';
import notification from './notifications';

const EMSApp = combineReducers({
  interfaceState,
  employeeState,
  departmentState,
  notification,
  form: formReducer
});

export default EMSApp;