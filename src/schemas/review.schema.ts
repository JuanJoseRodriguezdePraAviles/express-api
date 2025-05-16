import { Schema, model } from 'mongoose';
import { Review } from '../interfaces/Review';

const ReviewSchema = new Schema<Review>({
    email: {type: String, required: true},
    date: {type: Date, required: true},
    clientId: {type: String, required: true},
    customerName: {type: String, required: true},
    phone: {type: String, required: true},
    subject: {type: String, required: true},
    comment: {type: String, required: true},
    archived: {type: Boolean, required: true}
});

export const ReviewModel = model<Review>('Review', ReviewSchema);