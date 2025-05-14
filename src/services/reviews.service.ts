import { ReviewModel } from '../schemas/review.schema'
import { Review } from '../interfaces/Review';
import { sequelize } from '../config/database';

export const getAllReviews = async (): Promise<Review[]> => {
    const [reviews] = await sequelize.query('SELECT * FROM review');
    return reviews as Review[];
}

export const getReviewById = async (id: string): Promise<Review | null> => {
    const [results] = await sequelize.query('SELECT * FROM review WHERE ID = :id', {
        replacements: { id }
    });
    const reviews = results as Review[];
    return reviews[0] || null;
}

export const createReview = async (newReview: Review): Promise<Review> => {
    if (!newReview.email || !newReview.date || !newReview.customer_id || !newReview.customer_name || !newReview.phone
        || !newReview.subject || !newReview.comment || !newReview.archived
    ) {
        throw new Error("Missing required review fields");
    }
    const [results] = await sequelize.query(
        `INSERT INTO review (
            email, date, customer_id, customer_name, phone, subject, comment, archived
        ) VALUES (
            :email, :date, :customer_id, :customer_name, :phone, :subject, :comment, :archived 
        ) RETURNING *`,
        {
            replacements: {
                email: newReview.email,
                date: newReview.date,
                customer_id: newReview.customer_id,
                customer_name: newReview.customer_name,
                phone: newReview.phone,
                subject: newReview.subject,
                comment: newReview.comment,
                archived: newReview.archived
            }
        }
    );
    return (results as Review[])[0];
}

export const updateReview = async (id: string, updateReview: Partial<Review>): Promise<Review | null> => {
    const fields = Object.keys(updateReview);
    if(fields.length === 0) return null;

    const setClause = fields.map((field, i) => `${field} = :value${i}`).join(', ');
    const replacements: Record<string, any> = { id };
    fields.forEach((field, i) => {
        replacements[`value${i}`] = (updateReview as any)[field];
    });
    const [results] = await sequelize.query(
        `UPDATE review SET ${setClause} WHERE id = :id RETURNING *`,
        { replacements }
    );
    return (results as Review[])[0] || null;
}

export const deleteReview = async (id: string): Promise<boolean> => {
    const [results] = await sequelize.query('DELETE FROM review WHERE ID = :id', {
        replacements:  { id }
    });
    return true;
}