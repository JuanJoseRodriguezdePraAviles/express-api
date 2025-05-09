"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.createEmployee = exports.getEmployeeById = exports.getAllEmployees = void 0;
const employee_schema_1 = require("../schemas/employee.schema");
const employee_validator_1 = __importDefault(require("../validators/employee.validator"));
const booking_validator_1 = __importDefault(require("../validators/booking.validator"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const getAllEmployees = async () => {
    const employees = await employee_schema_1.EmployeeModel.find();
    return employees;
};
exports.getAllEmployees = getAllEmployees;
const getEmployeeById = async (id) => {
    const employee = await employee_schema_1.EmployeeModel.findOne({ id: id });
    return employee;
};
exports.getEmployeeById = getEmployeeById;
const createEmployee = async (newEmployee) => {
    try {
        const validatedEmployee = employee_validator_1.default.validateEmployee(newEmployee);
        if (!validatedEmployee) {
            throw new Error(`Employee validation failed: ${booking_validator_1.default.errors.join(', ')}`);
        }
        const employee = new employee_schema_1.EmployeeModel({
            ...newEmployee,
            password: await bcryptjs_1.default.hash(newEmployee.password, 10)
        });
        await employee.save();
        return employee;
    }
    catch (error) {
        throw error;
    }
};
exports.createEmployee = createEmployee;
const updateEmployee = async (id, updateEmployee) => {
    const employee = await employee_schema_1.EmployeeModel.findOneAndUpdate({ _id: id }, updateEmployee, { new: true });
    return employee;
};
exports.updateEmployee = updateEmployee;
const deleteEmployee = async (id) => {
    const deleted = await employee_schema_1.EmployeeModel.findByIdAndDelete({ _id: id });
    if (!deleted) {
        return false;
    }
    return true;
};
exports.deleteEmployee = deleteEmployee;
