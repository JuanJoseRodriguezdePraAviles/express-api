import { Request, Response } from 'express';
import { Review } from '../interfaces/Review';
import * as ReviewService from '../services/reviews.service'
import ReviewValidator from '../validators/review.validator';

let reviews: Review[] = [];

export const getAllReviewsController = (req: Request, res: Response): void => {
    const reviews = ReviewService.getAllReviews();
    const validatedReviews = ReviewValidator.validateReviewList(reviews);

    if(!validatedReviews) {
        res.status(500).json({ message: ReviewValidator.getErrors().join('; ') });
        return;
    }

    res.json(validatedReviews);
}

export const getReviewByIdController = (req: Request, res: Response): void => {
    const review = ReviewService.getReviewById(req.params.id);
    if (!review) {
        res.status(404).json({ message: ReviewValidator.getErrors().join('; ') });
        return;
    }

    const validatedReview = ReviewValidator.validateReview(review);

    if(!validatedReview || validatedReview.id !== req.params.id) {
        res.status(400).json({ message: ReviewValidator.getErrors().join('; ') });
        return;
    }
    res.json(validatedReview);
}

export const createReviewController = (req: Request, res: Response): void => {
    const validatedReview = ReviewValidator.validateReview(req.body);

    if (!ReviewValidator.validateReview) {
        res.status(400).json({ message: ReviewValidator.getErrors().join('; ') });
        return;
    }

    const newReview: Review = ReviewService.createReview(validatedReview as Review);
    res.status(201).json(newReview);
}

export const updateReviewController = (req: Request, res: Response): void => {
    const updatedReview = ReviewService.updateReview(req.params.id, req.body)

    if (!updatedReview) {
        res.status(404).json({ message: ReviewValidator.getErrors().join('; ') });
        return;
    }

    const validatedReview = ReviewValidator.validateReview(updatedReview);

    if (!validatedReview || validatedReview.id !== req.params.id) {
        res.status(400).json({ message: ReviewValidator.getErrors().join('; ') });
        return;
    }

    res.json(validatedReview);
}

export const deleteReviewController = (req: Request, res: Response): void => {
    const deletedReview = ReviewService.deleteReview(req.params.id);

    if (!deletedReview){
        res.status(404).json({ message: ReviewValidator.getErrors().join('; ') });
        return;
    }

    const isValid = ReviewValidator.validateReview(deletedReview);
    if (!isValid || deletedReview.id !== req.params.id) {
        res.status(400).json({ message: ReviewValidator.getErrors().join('; ') });
        return;
    }

    res.json(deletedReview);
}