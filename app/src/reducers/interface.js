import * as types from '../actions/actionTypes';
import initUI from './initUI';


const interfaces = (state = initUI, action) => {
  switch (action.type) {
    case types.DOCKED_DRAWER:
      return Object.assign({}, state, {
        isDocked: false,
      });
    case types.UNDOCKED_DRAWER:
      return Object.assign({}, state, {
        isDocked: true,
      });
    default:
      return state
  }
}

export default interfaces;
