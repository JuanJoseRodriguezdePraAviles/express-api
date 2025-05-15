export interface Review {
    ID?: string,
    email: string,
    date: Date,
    clientID: string,
    customer_name: string,
    phone: string,
    subject: string,
    comment: string,
    archived: boolean
}