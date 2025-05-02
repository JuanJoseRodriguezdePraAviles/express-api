import { Request, Response } from 'express';
import { Employee } from '../interfaces/Employee';
import * as EmployeeService from '../services/employees.service'
import EmployeeValidator from '../validators/employee.validator';

let employees: Employee[] = [];

export const getAllEmployeesController = async (req: Request, res: Response): Promise<void> => {
    const employees = await EmployeeService.getAllEmployees();
    res.json(employees);
}

export const getEmployeeByIdController = (req: Request, res: Response): void => {
    const employee = EmployeeService.getEmployeeById(req.params.id);
    if (!employee) {
        res.status(404).json({ message: EmployeeValidator.getErrors().join('; ') });
        return;
    }

    const validatedEmployee = EmployeeValidator.validateEmployee(employee);

    if (!validatedEmployee || validatedEmployee._id !== req.params.id) {
        res.status(400).json({ message: EmployeeValidator.getErrors().join('; ') });
        return;
    }
    res.json(validatedEmployee);
}

export const createEmployeeController = async (req: Request, res: Response): Promise<void> => {
    try {
        const validatedEmployee = EmployeeValidator.validateEmployee(req.body);

        if (!EmployeeValidator.validateEmployee) {
            res.status(400).json({ message: EmployeeValidator.getErrors().join('; ') });
            return;
        }

        const newEmployee: Employee = await EmployeeService.createEmployee(validatedEmployee as Employee);
        res.status(201).json(newEmployee);
    } catch (error: any) {
        res.status(500).json({message: 'Error creating employee', error: (error as Error).message});
    }
    
}

export const updateEmployeeController = (req: Request, res: Response): void => {
    const updatedEmployee = EmployeeService.updateEmployee(req.params.id, req.body)

    if (!updatedEmployee) {
        res.status(404).json({ message: EmployeeValidator.getErrors().join('; ') });
        return;
    }

    const validatedEmployee = EmployeeValidator.validateEmployee(updatedEmployee);

    if (!validatedEmployee || validatedEmployee._id !== req.params.id) {
        res.status(400).json({ message: EmployeeValidator.getErrors().join('; ') });
        return;
    }

    res.json(validatedEmployee);
}

export const deleteEmployeeController = async (req: Request, res: Response): Promise<void> => {
    const success = await EmployeeService.deleteEmployee(req.params.id);

    if (!success) {
        res.status(404).json({ message: EmployeeValidator.getErrors().join('; ') });
        return;
    }

    res.status(204).send();
}