import * as types from './actionTypes'
import {
  addNotification
} from './notificationActions'
import departmentApi from '../api/departmentApi';
import queryString from 'query-string';


export const requestDepartmentsError = error => ({
  type: types.REQUEST_SERVER_ERROR,
  error: error,
  receivedAt: Date.now()
});

export const sendRequest = () => ({
  type: types.SEND_REQUEST
})

export const requestDepartmentsSuccess = data => ({
  type: types.LOAD_DEPARTMENTS_SUCCESS,
  data,
  receivedAt: Date.now()
});
export const createDepartmentSuccess = (department, history) => {
  history.push({
    pathname: `/departments/${department._id}`
  })
  return {
    type: types.CREATE_DEPARTMENT_SUCCESS,
    department,
    receivedAt: Date.now()
  }
};
export const deleteDepartmentSuccess = (departmentIds) => ({
  type: types.DELETE_DEPARTMENT_SUCCESS,
  departmentIds,
  receivedAt: Date.now()
});
export const turnOnFilter = () => ({
  type: types.TURN_ON_FILTER
})
export const turnOffFilter = () => ({
    type: types.TURN_OFF_FILTER
})

const convertedDepartment = department => {
  department.createdAt = new Date(department.createdAt);
  return department;
}
export const fetchDepartments = (location, page_size) => dispatch => {
  const query = Object.assign({}, queryString.parse(location.search));
  const pageStr = query._page;

  delete query._page;
  query._offset = pageStr ? (parseInt(pageStr, 10) - 1) * page_size : 0;
  query._limit = page_size;

  const search = Object.keys(query).map(k => `${k}=${query[k]}`).join('&');

  dispatch(sendRequest());
  return departmentApi.getAllDepartments(search).then(response => {
    if (!response.ok) return response.json().then(error => Promise.reject(error));
    response.json().then(data => {
      const departments = data.records;
      departments.forEach(department => {
        department.createdAt = new Date(department.createdAt);
        if (department.completionDate) {
          department.completionDate = new Date(department.completionDate);
        }
      });

      dispatch(requestDepartmentsSuccess({
        pageNum: pageStr ? parseInt(pageStr) : 1,
        offset: query._offset,
        departments,
        totalCount: data.metadata.totalCount
      }));
      dispatch(addNotification('Load departments successfully', 'success'));

    });
  }).catch(err => {
    const errorMsg = `Error in fetching data from server: ${err.message}`;
    console.log('errorMsg', errorMsg);
    dispatch(requestDepartmentsError(errorMsg))
    dispatch(addNotification(errorMsg, 'error'));
  });
};


export const createDepartment = (department, history) => {
  return dispatch => {
    dispatch(sendRequest());

    departmentApi.createDepartment(department).then(response => {
      if (!response.ok) {
        return response.json().then(error => {
          const errorMsg = `Failed to add department: ${error.message}`;
          dispatch(requestDepartmentsError(errorMsg))
          dispatch(addNotification(errorMsg, 'error'));;
        });
      }
      response.json().then(updatedDepartment => {
        updatedDepartment = convertedDepartment(updatedDepartment);
        dispatch(createDepartmentSuccess(updatedDepartment, history));
        dispatch(addNotification('Create department successfully', 'success'));
      })
    }).catch(error => {
      const errorMsg = `Error in sending data to server: ${error.message}`;
      dispatch(requestDepartmentsError(errorMsg))
    });
  }
};
