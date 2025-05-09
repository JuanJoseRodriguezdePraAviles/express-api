import { EmployeeModel } from '../schemas/employee.schema';
import { Employee } from '../interfaces/Employee';
import bcrypt from 'bcryptjs';

export const getAllEmployees = async (): Promise<Employee[]> => {
    const employees = await EmployeeModel.find();
    return employees;
}

export const getEmployeeById = async (id: string): Promise<Employee | null> => {
    const employee = await EmployeeModel.findOne({ id: id });
    return employee;
}

export const createEmployee = async (newEmployee: Employee): Promise<Employee> => {
    try {
        const employee = new EmployeeModel({
            ...newEmployee,
            password: await bcrypt.hash(newEmployee.password, 10)
        });
        await employee.save();
        return employee;
    } catch(error) {
        throw error;
    }
}

export const updateEmployee = async (id: string, updateEmployee: Partial<Employee>): Promise<Employee | null> => {
    const employee = await EmployeeModel.findOneAndUpdate(
        { _id: id },
        updateEmployee,
        { new: true }
    );
    return employee;
}

export const deleteEmployee = async (id: string): Promise<boolean> => {
    const deleted = await EmployeeModel.findByIdAndDelete({ _id: id });
    if (!deleted) {
        return false;
    }
    return true;
}