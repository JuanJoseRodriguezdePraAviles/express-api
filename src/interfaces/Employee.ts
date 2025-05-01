export interface Employee {
    _id?: string,
    name: string,
    email: string,
    password: string,
    job_functions?: string,
    registration_date: Date,
    phone?: string,
    schelude?: string,
    status?: boolean
}