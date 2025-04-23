"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
class EmployeeValidator {
}
_a = EmployeeValidator;
EmployeeValidator.errors = [];
EmployeeValidator.validateEmployee = (employee) => {
    if (!employee || typeof employee !== 'object') {
        _a.errors.push("Invalid object employee");
    }
    if ('id' in employee && typeof employee.id !== 'string') {
        _a.errors.push("Invalid employee ID");
    }
    if ('name' in employee && typeof employee.name !== 'string') {
        _a.errors.push("Invalid employee name");
    }
    if ('email' in employee && typeof employee.email !== 'string') {
        _a.errors.push("Invalid employee email");
    }
    if ('job_functions' in employee && typeof employee.room_description !== 'string') {
        _a.errors.push("Invalid employee job functions");
    }
    if ('registration_date' in employee && !(employee.registration_date instanceof Date)) {
        _a.errors.push("Invalid registration date");
    }
    if ('phone' in employee && typeof employee.phone !== 'string') {
        _a.errors.push("Invalid employee phone");
    }
    if ('schelude' in employee && typeof employee.schelude !== 'string') {
        _a.errors.push("Invalid employee schelude");
    }
    if ('status' in employee && typeof employee.status !== 'boolean') {
        _a.errors.push("Invalid employee status");
    }
    return _a.errors.length === 0 ? employee : false;
};
EmployeeValidator.validateEmployeeList = (data) => {
    if (!Array.isArray(data)) {
        _a.errors.push("Invalid employee list");
        return false;
    }
    const validatedEmployees = [];
    for (const item of data) {
        const validEmployee = _a.validateEmployee(item);
        if (!validEmployee)
            continue;
        validatedEmployees.push(validEmployee);
    }
    return validatedEmployees;
};
EmployeeValidator.getErrors = () => {
    return _a.errors;
};
exports.default = EmployeeValidator;
