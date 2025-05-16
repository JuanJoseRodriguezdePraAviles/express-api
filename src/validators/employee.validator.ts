import { Employee } from "../interfaces/Employee";

export default class EmployeeValidator {
    static errors: string[] = [];

    public static validateEmployee = (employee: any): Employee | false => {
        this.errors = [];
        
        if (!employee || typeof employee !== 'object') {
            this.errors.push("Invalid object employee");
        }
        if ('id' in employee && typeof employee.id !== 'string') {
            this.errors.push("Invalid employee ID");
        }
        if (!('name' in employee) || typeof employee.name !== 'string') {
            this.errors.push("Missing or Invalid employee name");
        }
        if (!('email' in employee) || typeof employee.email !== 'string') {
            this.errors.push("Missing or Invalid employee email");
        }
        if (!('password' in employee) || typeof employee.password !== 'string') {
            this.errors.push("Missing or Invalid employee password");
        }
        if ('job_functions' in employee && typeof employee.jobFunctions !== 'string') {
            this.errors.push("Invalid employee job functions");
        }
        if (!('registration_date' in employee) || !(new Date(employee.registrationDate) instanceof Date)) {
            this.errors.push("MissingInvalid registration date");
        }
        if ('phone' in employee && typeof employee.phone !== 'string') {
            this.errors.push("Invalid employee phone");
        }
        if ('schelude' in employee && typeof employee.schelude !== 'string') {
            this.errors.push("Invalid employee schelude");
        }
        if ('status' in employee && typeof employee.status !== 'boolean') {
            this.errors.push("Invalid employee status");
        }
        return this.errors.length === 0 ? employee as Employee : false;
    }

    public static validateEmployeeList = (data: any): Employee[] | false => {
        if (!Array.isArray(data)) {
            this.errors.push("Invalid employee list");
            return false
        }
        
        const validatedEmployees: Employee[] = [];

        for (const item of data) {
            const validEmployee = this.validateEmployee(item);
            if (!validEmployee) continue;
            validatedEmployees.push(validEmployee);
        }
        return validatedEmployees.length === 0? false : validatedEmployees;
    }

    public static getErrors = (): string[] => {
        return this.errors;
    }
}