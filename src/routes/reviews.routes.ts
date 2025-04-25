import { Router } from 'express';
import {
    getAllReviewsController,
    getReviewByIdController,
    createReviewController,
    updateReviewController,
    deleteReviewController
} from '../controllers/reviews.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticateToken, getAllReviewsController);
router.get('/:id', authenticateToken, getReviewByIdController);
router.post('/', authenticateToken, createReviewController);
router.put('/:id', authenticateToken, updateReviewController);
router.delete('/:id', authenticateToken, deleteReviewController);

export default router;