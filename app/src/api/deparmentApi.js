class employeeApi {
  
    static requestHeaders() {
      // return {'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`}
      return {};
    }
  
    static getAllDepartments(search) {
      const headers = this.requestHeaders();
      const request = new Request(`/api/department?${search}`, {
        method: 'GET',
        headers: headers
      });
  
      return fetch(request);
    }
    static createDepartment(department) {
      const headers = Object.assign({
        'Content-Type': 'application/json'
      }, this.requestHeaders());
      const request = new Request(`/api/department`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(department)
      });
  
      return fetch(request);
    };
  
    static updateDepartment(department) {
      const headers = Object.assign({
        'Content-Type': 'application/json'
      }, this.requestHeaders());
      const request = new Request(`/api/department/${department.id}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({
          department: department
        })
      });
  
      return fetch(request);
    };
  }
  
  export default employeeApi;
  