'use strict';

const validIssueStatus = {
    New: true,
    Open: true,
    Assigned: true,
    Fixed: true,
    Verified: true,
    Closed: true,
};
const employeeFieldType = {
    status: 'required',
    owner: 'required',
    effort: 'optional',
    created: 'required',
    completionDate: 'optional',
    title: 'required',
    comment: 'optional',
}

function convertemployee(employee) {
    if (employee.created) employee.created = new Date(employee.created);
    if (employee.completionDate) employee.completionDate = new Date(employee.completionDate);
    return cleanupIssue(employee);
}

function cleanupIssue(employee) {
    const cleanedUpIssue = {};
    // The Object.keys() method returns an array of a given object's own enumerable properties
    Object.keys(employee).forEach(field => {
        if (employeeFieldType[field]) cleanedUpIssue[field] = employee[field];
    });
    return cleanedUpIssue;
}

function validateIssue(employee) {
    const errors = [];
    Object.keys(employeeFieldType).forEach(field => {
        if (employeeFieldType[field] === 'required' && !employee[field]) {
            errors.push(`Missing mandatory field: ${field}`);
        }
    });

    if (!validIssueStatus[employee.status]) {
        // template string ES2015 new feature
        errors.push(`${employee.status} is not a valid status.`);
    }
    return (errors.length ? errors.join('; ') : null);
}
export default {
    validateIssue,
    cleanupIssue,
    convertIssue
};
