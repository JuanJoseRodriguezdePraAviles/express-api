export interface Employee {
    DNI?: string,
    name: string,
    email: string,
    password: string,
    job_functions?: string,
    registration_date: Date,
    phone?: string,
    schelude?: string,
    status?: boolean
}