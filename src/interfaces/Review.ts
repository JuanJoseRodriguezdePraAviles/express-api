export interface Review {
    _id?: string,
    email: string,
    date: Date,
    customer_id: string
    customer_name: string,
    phone: string,
    subject: string,
    comment: string,
    archived: boolean
}