import { EmployeeModel } from '../schemas/employee.schema';
import { Employee } from '../interfaces/Employee';

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
            id: Date.now().toString()
        });
        await employee.save();
        return employee;
    } catch(error) {
        throw error;
    }
}

export const updateEmployee = async (id: string, updateEmployee: Partial<Employee>): Promise<Employee | null> => {
    const employee = await EmployeeModel.findOneAndUpdate(
        { booking_id: id },
        updateEmployee,
        { new: true }
    );
    return employee;
}

export const deleteEmployee = async (id: string): Promise<boolean> => {
    const deleted = await EmployeeModel.findByIdAndDelete({ id: id });
    if (!deleted) {
        return false;
    }
    return true;
}