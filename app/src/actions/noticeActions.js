import * as types from './actionTypes'
import {
  addNotification
} from './notificationActions'
import noticeApi from '../api/noticeApi';
import queryString from 'query-string';


export const requestNoticesError = error => ({
  type: types.REQUEST_SERVER_ERROR,
  error: error,
  receivedAt: Date.now()
});

export const sendRequest = () => ({
  type: types.SEND_NOTICE_REQUEST
})

export const requestNoticesSuccess = data => ({
  type: types.LOAD_NOTICES_SUCCESS,
  data,
  receivedAt: Date.now()
});
export const createNoticeSuccess = (notice, history) => {
  return {
    type: types.CREATE_NOTICE_SUCCESS,
    notice,
    receivedAt: Date.now()
  }
};
export const deleteNoticeSuccess = (noticeIds) => ({
  type: types.DELETE_NOTICE_SUCCESS,
  noticeIds,
  receivedAt: Date.now()
});
export const turnOnFilter = () => ({
  type: types.TURN_ON_FILTER
})
export const turnOffFilter = () => ({
    type: types.TURN_OFF_FILTER
})

const convertedNotice = notice => {
  notice.createdAt = new Date(notice.createdAt);
  return notice;
}
export const fetchNotices = (location, page_size) => dispatch => {
  const query = Object.assign({}, queryString.parse(location.search));

  const search = Object.keys(query).map(k => `${k}=${query[k]}`).join('&');

  dispatch(sendRequest());
  return noticeApi.getAllNotices(search).then(response => {
    if (!response.ok) return response.json().then(error => Promise.reject(error));
    response.json().then(data => {
      const notices = data.notices;
      notices.forEach(notice => {
        notice.createdAt = new Date(notice.createdAt);
        if (notice.completionDate) {
          notice.completionDate = new Date(notice.completionDate);
        }
      });

      dispatch(requestNoticesSuccess({
        notices,
      }));
      dispatch(addNotification('Load notices successfully', 'success'));

    });
  }).catch(err => {
    const errorMsg = `Error in fetching data from server: ${err.message}`;
    console.log('errorMsg', errorMsg);
    dispatch(requestNoticesError(errorMsg))
    dispatch(addNotification(errorMsg, 'error'));
  });
};


export const createNotice = (notice, history) => {
  return dispatch => {
    dispatch(sendRequest());

    noticeApi.createNotice(notice).then(response => {
      if (!response.ok) {
        return response.json().then(error => {
          const errorMsg = `Failed to add notice: ${error.message}`;
          dispatch(requestNoticesError(errorMsg))
          dispatch(addNotification(errorMsg, 'error'));;
        });
      }
      response.json().then(updatedNotice => {
        updatedNotice = convertedNotice(updatedNotice);
        dispatch(createNoticeSuccess(updatedNotice, history));
        dispatch(addNotification('Create notice successfully', 'success'));
      })
    }).catch(error => {
      const errorMsg = `Error in sending data to server: ${error.message}`;
      dispatch(requestNoticesError(errorMsg))
    });
  }
};
