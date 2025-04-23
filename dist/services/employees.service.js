"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.createEmployee = exports.getEmployeeById = exports.getAllEmployees = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const employeesFilePath = path_1.default.join(__dirname, '../../public/Employees.json');
const readEmployeesFromFile = () => {
    const fileData = fs_1.default.readFileSync(employeesFilePath, 'utf-8');
    return JSON.parse(fileData);
};
const getAllEmployees = () => {
    return readEmployeesFromFile();
};
exports.getAllEmployees = getAllEmployees;
const getEmployeeById = (id) => {
    const employees = readEmployeesFromFile();
    return employees.find(employee => String(employee.id) === id);
};
exports.getEmployeeById = getEmployeeById;
const createEmployee = (newEmployee) => {
    const employees = readEmployeesFromFile();
    newEmployee.id = Date.now().toString();
    employees.push(newEmployee);
    fs_1.default.writeFileSync(employeesFilePath, JSON.stringify(employees, null, 2), 'utf-8');
    return newEmployee;
};
exports.createEmployee = createEmployee;
const updateEmployee = (id, updateEmployee) => {
    const employees = readEmployeesFromFile();
    const index = employees.findIndex(employee => String(employee.id) === id);
    if (index !== -1) {
        employees[index] = { ...employees[index], ...updateEmployee };
        fs_1.default.writeFileSync(employeesFilePath, JSON.stringify(employees, null, 2), 'utf-8');
        return employees[index];
    }
    return undefined;
};
exports.updateEmployee = updateEmployee;
const deleteEmployee = (id) => {
    const employees = readEmployeesFromFile();
    const index = employees.findIndex(employee => String(employee.id) === id);
    if (index !== -1) {
        const deletedEmployee = employees.splice(index, 1);
        fs_1.default.writeFileSync(employeesFilePath, JSON.stringify(employees, null, 2), 'utf-8');
        return deletedEmployee[0];
    }
    return undefined;
};
exports.deleteEmployee = deleteEmployee;
