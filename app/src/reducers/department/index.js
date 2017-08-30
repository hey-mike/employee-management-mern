import * as types from '../../actions/actionTypes';
import initDepartment from './initDepartment';


const departments = (state = initDepartment, action) => {
  switch (action.type) {
    case types.SEND_DEPARTMENT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case types.TURN_ON_FILTER:
      return Object.assign({}, state, {
        openFilter: true,
      });
    case types.TURN_OFF_FILTER:
      return Object.assign({}, state, {
        openFilter: false,
      });
    case types.REQUEST_SERVER_ERROR:
      // console.log('REQUEST_SERVER_ERROR', action);
      return Object.assign({}, state, {
        error: action.error,
        receivedAt: action.receivedAt,
        isFetching: false
      });

    case types.LOAD_DEPARTMENTS_SUCCESS:
      // console.log('LOAD_DEPARTMENTS_SUCCESS');
      return Object.assign({}, state, {
        departments: action.data.departments,
        isFetching: false,
        receivedAt: action.receivedAt
      });

    case types.CREATE_DEPARTMENT_SUCCESS:
      // console.log('CREATE_DEPARTMENT_SUCCESS');
      const updatedDepartment = action.department;
      return Object.assign({}, state, {
        isFetching: false,
        departments: state.departments.concat(updatedDepartment),
        receivedAt: action.receivedAt
      });

    case types.DELETE_DEPARTMENT_SUCCESS:
      // console.log('DELETE_DEPARTMENT_SUCCESS');
      const newDepartments = state.departments.filter(department => action.departmentIds.indexOf(department._id) == -1);
      return Object.assign({}, state, {
        departments: newDepartments,
        deletedDepartments: state.deletedDepartments.concat(action.departmentIds),
        isFetching: false,
        receivedAt: action.receivedAt
      });
    default:
      return state
  }
}

export default departments
