import * as types from '../actions/actionTypes';
import initNotice from './initNotice';


const notices = (state = initNotice, action) => {
  switch (action.type) {
    case types.SEND_NOTICE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
      
    case types.REQUEST_SERVER_ERROR:
      return Object.assign({}, state, {
        error: action.error,
        receivedAt: action.receivedAt,
        isFetching: false
      });

    case types.LOAD_NOTICES_SUCCESS:
      return Object.assign({}, state, {
        notices: action.data.notices,
        isFetching: false,
        receivedAt: action.receivedAt
      });

    case types.CREATE_NOTICE_SUCCESS:
      const updatedNotice = action.notice;
      return Object.assign({}, state, {
        isFetching: false,
        notices: state.notices.concat(updatedNotice),
        receivedAt: action.receivedAt
      });

    case types.DELETE_NOTICE_SUCCESS:
      const newNotices = state.notices.filter(notice => action.noticeIds.indexOf(notice._id) == -1);
      return Object.assign({}, state, {
        notices: newNotices,
        deletedNotices: state.deletedNotices.concat(action.noticeIds),
        isFetching: false,
        receivedAt: action.receivedAt
      });
    default:
      return state
  }
}

export default notices
