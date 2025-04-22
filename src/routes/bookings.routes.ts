import { Router } from 'express';
import {
    getAllBookingsController,
    getBookingByIdController,
    createBookingController,
    updateBookingController,
    deleteBookingController
} from '../controllers/bookings.controller';

const router = Router();

router.get('/', getAllBookingsController);
router.get('/:id', getBookingByIdController);
router.post('/', createBookingController);
router.put('/:id', updateBookingController);
router.delete('/:id', deleteBookingController);

export default router;