import { Schema, model } from 'mongoose';
import { Review } from '../interfaces/Review';

const ReviewSchema = new Schema<Review>({
    id: {type: String, required: true},
    email: {type: String, required: true},
    date: {type: Date, required: true},
    customer_id: {type: String, required: true},
    customer_name: {type: String, required: true},
    phone: {type: String, required: true},
    subject: {type: String, required: true},
    comment: {type: String, required: true},
    archived: {type: Boolean, required: true}
});

export const ReviewModel = model<Review>('Review', ReviewSchema);