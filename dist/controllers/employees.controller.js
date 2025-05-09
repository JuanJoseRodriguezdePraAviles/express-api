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
const getAllEmployeesController = async (req, res) => {
    const employees = await EmployeeService.getAllEmployees();
    res.json(employees);
};
exports.getAllEmployeesController = getAllEmployeesController;
const getEmployeeByIdController = (req, res) => {
    const employee = EmployeeService.getEmployeeById(req.params.id);
    if (!employee) {
        res.status(404).json({ message: employee_validator_1.default.getErrors().join('; ') });
        return;
    }
    const validatedEmployee = employee_validator_1.default.validateEmployee(employee);
    if (!validatedEmployee || validatedEmployee._id !== req.params.id) {
        res.status(400).json({ message: employee_validator_1.default.getErrors().join('; ') });
        return;
    }
    res.json(validatedEmployee);
};
exports.getEmployeeByIdController = getEmployeeByIdController;
const createEmployeeController = async (req, res) => {
    try {
        const validatedEmployee = employee_validator_1.default.validateEmployee(req.body);
        if (!validatedEmployee) {
            res.status(400).json({ message: employee_validator_1.default.getErrors().join('; ') });
            return;
        }
        const newEmployee = await EmployeeService.createEmployee(validatedEmployee);
        res.status(201).json(newEmployee);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating employee', error: error.message });
    }
};
exports.createEmployeeController = createEmployeeController;
const updateEmployeeController = async (req, res) => {
    const validatedEmployee = employee_validator_1.default.validateEmployee(req.body);
    if (!validatedEmployee) {
        res.status(404).json({ message: employee_validator_1.default.getErrors().join('; ') });
        return;
    }
    const updatedEmployee = await EmployeeService.updateEmployee(req.params.id, validatedEmployee);
    res.json(updatedEmployee);
};
exports.updateEmployeeController = updateEmployeeController;
const deleteEmployeeController = async (req, res) => {
    const success = await EmployeeService.deleteEmployee(req.params.id);
    if (!success) {
        res.status(404).json({ message: employee_validator_1.default.getErrors().join('; ') });
        return;
    }
    res.status(204).send();
};
exports.deleteEmployeeController = deleteEmployeeController;
