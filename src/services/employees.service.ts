import { EmployeeModel } from '../schemas/employee.schema';
import { Employee } from '../interfaces/Employee';
import bcrypt from 'bcryptjs';
import { sequelize } from '../config/database';

export const getAllEmployees = async (): Promise<Employee[]> => {
    const [employees] = await sequelize.query('SELECT * FROM employee');
    return employees as Employee[];
}

export const getEmployeeById = async (id: string): Promise<Employee | null> => {
    const [results] = await sequelize.query('SELECT * FROM employee WHERE ID = :id', {
        replacements: { id }
    });
    const employees = results as Employee[];
    return employees[0] || null;
}

export const createEmployee = async (newEmployee: Employee): Promise<Employee> => {
    if (!newEmployee.name || !newEmployee.email || !newEmployee.password || !newEmployee.registration_date) {
        throw new Error("Missing required employee fields");
    }
    const [results] = await sequelize.query(
        `INSERT INTO employee (
            DNI, name, email, password, job_functions, registration_date,
            phone, schelude, status
        ) VALUES (
            :DNI, :name, :email, :password, :job_functions, :registration_date,
            :phone, :schelude, :status 
        ) RETURNING *`,
        {
            replacements: {
                DNI: newEmployee.DNI,
                name: newEmployee.name,
                email: newEmployee.email,
                password: newEmployee.password,
                job_functions: newEmployee.job_functions,
                registration_date: newEmployee.registration_date,
                phone: newEmployee.phone,
                schelude: newEmployee.schelude,
                status: newEmployee.status
            }
        }
    );
    return (results as Employee[])[0];
}

export const updateEmployee = async (id: string, updateEmployee: Partial<Employee>): Promise<Employee | null> => {
    const fields = Object.keys(updateEmployee);
    if(fields.length === 0) return null;

    const setClause = fields.map((field, i) => `${field} = :value${i}`).join(', ');
    const replacements: Record<string, any> = { id };
    fields.forEach((field, i) => {
        replacements[`value${i}`] = (updateEmployee as any)[field];
    });
    const [results] = await sequelize.query(
        `UPDATE employee SET ${setClause} WHERE id = :id RETURNING *`,
        { replacements }
    );
    return (results as Employee[])[0] || null; 
}

export const deleteEmployee = async (id: string): Promise<boolean> => {
    const [results] = await sequelize.query('DELETE FROM employee WHERE id = :id', {
        replacements: { id }
    });
    return true;
}