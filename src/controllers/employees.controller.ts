import { Request, Response } from 'express';
import { Employee } from '../interfaces/Employee';
import * as EmployeeService from '../services/employees.service'
import EmployeeValidator from '../validators/employee.validator';

let employees: Employee[] = [];

export const getAllEmployeesController = (_req: Request, res: Response): void => {
    const employees = EmployeeService.getAllEmployees();
    const validatedEmployees = EmployeeValidator.validateEmployeeList(employees);
    if(!validatedEmployees) {
        res.status(500).json({ message: EmployeeValidator.getErrors().join('; ') });
        return;
    }

    res.json(validatedEmployees);
}

export const getEmployeeByIdController = (req: Request, res: Response): void => {
    const employee = EmployeeService.getEmployeeById(req.params.id);
    if (!employee) {
        res.status(404).json({ message: EmployeeValidator.getErrors().join('; ') });
        return;
    }

    const validatedEmployee = EmployeeValidator.validateEmployee(employee);

    if(!validatedEmployee || validatedEmployee.id !== req.params.id) {
        res.status(400).json({ message: EmployeeValidator.getErrors().join('; ') });
        return;
    }
    res.json(validatedEmployee);
}

export const createEmployeeController = (req: Request, res: Response): void => {
    const validatedEmployee = EmployeeValidator.validateEmployee(req.body);

    if (!EmployeeValidator.validateEmployee) {
        res.status(400).json({ message: EmployeeValidator.getErrors().join('; ') });
        return;
    }

    const newEmployee: Employee = EmployeeService.createEmployee(validatedEmployee as Employee);
    res.status(201).json(newEmployee);
}

export const updateEmployeeController = (req: Request, res: Response): void => {
    const updatedEmployee = EmployeeService.updateEmployee(req.params.id, req.body)

    if (!updatedEmployee) {
        res.status(404).json({ message: EmployeeValidator.getErrors().join('; ') });
        return;
    }

    const validatedEmployee = EmployeeValidator.validateEmployee(updatedEmployee);

    if (!validatedEmployee || validatedEmployee.id !== req.params.id) {
        res.status(400).json({ message: EmployeeValidator.getErrors().join('; ') });
        return;
    }

    res.json(validatedEmployee);
}

export const deleteEmployeeController = (req: Request, res: Response): void => {
    const deletedEmployee = EmployeeService.deleteEmployee(req.params.id);

    if (!deletedEmployee){
        res.status(404).json({ message: EmployeeValidator.getErrors().join('; ') });
        return;
    }

    const isValid = EmployeeValidator.validateEmployee(deletedEmployee);
    if (!isValid || deletedEmployee.id !== req.params.id) {
        res.status(400).json({ message: EmployeeValidator.getErrors().join('; ') });
        return;
    }

    res.json(deletedEmployee);
}