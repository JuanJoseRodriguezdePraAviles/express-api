import { Router } from 'express';
import {
    getAllBookingsController,
    getBookingByIdController,
    createBookingController,
    updateBookingController,
    deleteBookingController
} from '../controllers/bookings.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticateToken, getAllBookingsController);
router.get('/:id', authenticateToken, getBookingByIdController);
router.post('/', authenticateToken, createBookingController);
router.put('/:id', authenticateToken, updateBookingController);
router.delete('/:id', authenticateToken, deleteBookingController);

export default router;