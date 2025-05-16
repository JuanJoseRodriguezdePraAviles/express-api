export interface Review {
    id?: string,
    email: string,
    date: Date,
    clientId: string,
    customerName: string,
    phone: string,
    subject: string,
    comment: string,
    archived: boolean
}