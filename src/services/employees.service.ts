import fs from 'fs';
import path from 'path';
import { Employee } from '../interfaces/Employee';

const employeesFilePath = path.join(__dirname, '../../public/Employees.json');

const readEmployeesFromFile = (): Employee[] => {
    const fileData = fs.readFileSync(employeesFilePath, 'utf-8');
    return JSON.parse(fileData);
}

export const getAllEmployees = (): Employee[] => {
    return readEmployeesFromFile();
}

export const getEmployeeById = (id: string): Employee | undefined => {
    const employees = readEmployeesFromFile();
    return employees.find(employee => String(employee.id) === id);
}

export const createEmployee = (newEmployee: Employee): Employee => {
    const employees = readEmployeesFromFile();
    newEmployee.id = Date.now().toString();
    employees.push(newEmployee);
    fs.writeFileSync(employeesFilePath, JSON.stringify(employees, null, 2), 'utf-8');
    return newEmployee;
}

export const updateEmployee = (id: string, updateEmployee: Partial<Employee>): Employee | undefined => {
    const employees = readEmployeesFromFile();
    const index = employees.findIndex(employee => String(employee.id) === id);

    if (index !== -1) {
        employees[index] = { ...employees[index], ...updateEmployee };
        fs.writeFileSync(employeesFilePath, JSON.stringify(employees, null, 2), 'utf-8');
        return employees[index];
    }
    return undefined;
}

export const deleteEmployee = (id: string): Employee | undefined => {
    const employees = readEmployeesFromFile();
    const index = employees.findIndex(employee => String(employee.id) === id);

    if (index !== -1) {
        const deletedEmployee = employees.splice(index, 1);
        fs.writeFileSync(employeesFilePath, JSON.stringify(employees, null, 2), 'utf-8');
        return deletedEmployee[0];
    }
    return undefined;
}