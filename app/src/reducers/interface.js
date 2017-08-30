import * as types from '../actions/actionTypes';
import initUI from './initUI';


const interfaces = (state = initUI, action) => {
  switch (action.type) {
    case types.DOCKED_DRAWER:
      return Object.assign({}, state, {
        isDocked: true,
        adjustWidth:action.adjustWidth
      });
    case types.UNDOCKED_DRAWER:
      return Object.assign({}, state, {
        isDocked: false,
        adjustWidth:action.adjustWidth
      });
    default:
      return state
  }
}

export default interfaces;
