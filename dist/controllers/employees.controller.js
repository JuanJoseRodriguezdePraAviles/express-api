"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployeeController = exports.updateEmployeeController = exports.createEmployeeController = exports.getEmployeeByIdController = exports.getAllEmployeesController = void 0;
const EmployeeService = __importStar(require("../services/employees.service"));
const employee_validator_1 = __importDefault(require("../validators/employee.validator"));
let employees = [];
const getAllEmployeesController = (_req, res) => {
    const employees = EmployeeService.getAllEmployees();
    const validatedEmployees = employee_validator_1.default.validateEmployeeList(employees);
    if (!validatedEmployees) {
        res.status(500).json({ message: "Invalid employee data format" });
        return;
    }
    res.json(validatedEmployees);
};
exports.getAllEmployeesController = getAllEmployeesController;
const getEmployeeByIdController = (req, res) => {
    const employee = EmployeeService.getEmployeeById(req.params.id);
    if (!employee) {
        res.status(404).json({ message: 'Employee not found' });
        return;
    }
    const validatedEmployee = employee_validator_1.default.validateEmployee(employee);
    if (!validatedEmployee || validatedEmployee.id !== req.params.id) {
        res.status(400).json({ message: 'Invalid employee data' });
        return;
    }
    res.json(validatedEmployee);
};
exports.getEmployeeByIdController = getEmployeeByIdController;
const createEmployeeController = (req, res) => {
    const validatedEmployee = employee_validator_1.default.validateEmployee(req.body);
    if (!employee_validator_1.default.validateEmployee) {
        res.status(400).json({ message: "Invalid employee format" });
        return;
    }
    const newEmployee = EmployeeService.createEmployee(validatedEmployee);
    res.status(201).json(newEmployee);
};
exports.createEmployeeController = createEmployeeController;
const updateEmployeeController = (req, res) => {
    const updatedEmployee = EmployeeService.updateEmployee(req.params.id, req.body);
    if (!updatedEmployee) {
        res.status(404).json({ message: 'Employee not found' });
        return;
    }
    const validatedEmployee = employee_validator_1.default.validateEmployee(updatedEmployee);
    if (!validatedEmployee || validatedEmployee.id !== req.params.id) {
        res.status(400).json({ message: 'Invalid updated employee data' });
        return;
    }
    res.json(validatedEmployee);
};
exports.updateEmployeeController = updateEmployeeController;
const deleteEmployeeController = (req, res) => {
    const deletedEmployee = EmployeeService.deleteEmployee(req.params.id);
    if (!deletedEmployee) {
        res.status(404).json({ message: 'Employee not found' });
        return;
    }
    const isValid = employee_validator_1.default.validateEmployee(deletedEmployee);
    if (!isValid || deletedEmployee.id !== req.params.id) {
        res.status(400).json({ message: 'Deleted employee data is invalid' });
        return;
    }
    res.json(deletedEmployee);
};
exports.deleteEmployeeController = deleteEmployeeController;
