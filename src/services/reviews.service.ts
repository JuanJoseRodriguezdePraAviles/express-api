import { ReviewModel } from '../schemas/review.schema'
import { Review } from '../interfaces/Review';


export const getAllReviews = async (): Promise<Review[]> => {
    const reviews = await ReviewModel.find();
    return reviews;
}

export const getReviewById = async (id: string): Promise<Review | null> => {
    const review = await ReviewModel.findOne({id: id});
    return review;
}

export const createReview = async (newReview: Review): Promise<Review> => {
    try {
        const review = new ReviewModel({
            ...newReview,
            id: Date.now().toString()
        });
        await review.save();
        return review;
    } catch(error) {
        throw error;
    }
}

export const updateReview = async (id: string, updateReview: Partial<Review>): Promise<Review | null> => {
    const review = await ReviewModel.findOneAndUpdate(
        {id: id},
        updateReview,
        {new: true}
    );
    return review;
}

export const deleteReview = async (id: string): Promise<boolean> => {
    const deleted = await ReviewModel.findOneAndDelete({id: id});
    if(!deleted) {
        return false;
    }
    return true;
}