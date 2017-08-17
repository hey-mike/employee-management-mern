class employeeApi {

  static requestHeaders() {
    // return {'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`}
    return {};
  }

  static getAllEmployees(search) {
    const headers = this.requestHeaders();
    const request = new Request(`/api/employee?${search}`, {
      method: 'GET',
      headers: headers
    });

    return fetch(request);
  }
  static createEmployee(employee) {
    const headers = Object.assign({
      'Content-Type': 'application/json'
    }, this.requestHeaders());
    const request = new Request(`/api/employee`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(employee)
    });

    return fetch(request);
  }

  static updateEmployee(employee) {
    const headers = Object.assign({
      'Content-Type': 'application/json'
    }, this.requestHeaders());
    const request = new Request(`/api/employee/${employee.id}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({
        employee: employee
      })
    });

    return fetch(request);
  }


  static deleteEmployee(employee) {
    const headers = Object.assign({
      'Content-Type': 'application/json'
    }, this.requestHeaders());
    const request = new Request(`/api/employee/${employee._id}`, {
      method: 'DELETE',
      headers: headers
    });

    return fetch(request);
  }

  static deleteBulkEmployee(docIds) {

    const headers = Object.assign({
      'Content-Type': 'application/json'
    }, this.requestHeaders());
    const request = new Request(`/api/employee`, {
      method: 'DELETE',
      headers: headers,
      body: JSON.stringify({
        docIds: docIds
      })
    });

    return fetch(request);
  }
}

export default employeeApi;
