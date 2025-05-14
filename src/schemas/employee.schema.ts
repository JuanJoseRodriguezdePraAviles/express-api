import { Schema, model } from 'mongoose';
import { Employee } from '../interfaces/Employee';

const EmployeeSchema = new Schema<Employee>({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    job_functions: {type: String},
    registration_date: {type: Date, required: true},
    phone: {type: String},
    schelude: {type: String},
    status: {type: Boolean, required: true}
});

export const EmployeeModel = model<Employee>('Employee', EmployeeSchema);