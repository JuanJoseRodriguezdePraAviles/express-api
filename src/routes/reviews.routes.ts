import { Router } from 'express';
import {
    getAllReviewsController,
    getReviewByIdController,
    createReviewController,
    updateReviewController,
    deleteReviewController
} from '../controllers/reviews.controller';

const router = Router();

router.get('/', getAllReviewsController);
router.get('/:id', getReviewByIdController);
router.post('/', createReviewController);
router.put('/:id', updateReviewController);
router.delete('/:id', deleteReviewController);

export default router;