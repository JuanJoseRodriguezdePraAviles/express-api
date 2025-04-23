import fs from 'fs';
import path from 'path';
import { Review } from '../interfaces/Review';

const reviewsFilePath = path.join(__dirname, '../../public/Reviews.json');

const readReviewsFromFile = (): Review[] => {
    const fileData = fs.readFileSync(reviewsFilePath, 'utf-8');
    return JSON.parse(fileData);
}

export const getAllReviews = (): Review[] => {
    return readReviewsFromFile();
}

export const getReviewById = (id: string): Review | undefined => {
    const reviews = readReviewsFromFile();
    return reviews.find(review => String(review.id) === id);
}

export const createReview = (newReview: Review): Review => {
    const reviews = readReviewsFromFile();
    newReview.id = Date.now().toString();
    reviews.push(newReview);
    fs.writeFileSync(reviewsFilePath, JSON.stringify(reviews, null, 2), 'utf-8');
    return newReview;
}

export const updateReview = (id: string, updateReview: Partial<Review>): Review | undefined => {
    const reviews = readReviewsFromFile();
    const index = reviews.findIndex(review => String(review.id) === id);

    if (index !== -1) {
        reviews[index] = { ...reviews[index], ...updateReview };
        fs.writeFileSync(reviewsFilePath, JSON.stringify(reviews, null, 2), 'utf-8');
        return reviews[index];
    }
    return undefined;
}

export const deleteReview = (id: string): Review | undefined => {
    const reviews = readReviewsFromFile();
    const index = reviews.findIndex(review => String(review.id) === id);

    if (index !== -1) {
        const deletedReview = reviews.splice(index, 1);
        fs.writeFileSync(reviewsFilePath, JSON.stringify(reviews, null, 2), 'utf-8');
        return deletedReview[0];
    }
    return undefined;
}