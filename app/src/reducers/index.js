import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import employeeState from './employee';
import notification from './notifications';

const EMSApp = combineReducers({
  employeeState,
  notification,
  form: formReducer
});

export default EMSApp;
