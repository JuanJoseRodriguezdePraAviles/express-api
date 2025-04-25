import { Request, Response } from 'express';
import { Booking } from '../interfaces/Booking';
import * as BookingService from '../services/bookings.service'
import BookingValidator from '../validators/booking.validator';

let bookings: Booking[] = [];

export const getAllBookingsController = (req: Request, res: Response): void => {
    const bookings = BookingService.getAllBookings();
    const validatedBookings = BookingValidator.validateBookingList(bookings);

    if(!validatedBookings) {
        res.status(500).json({ message: BookingValidator.getErrors().join('; ') });
        return;
    }

    res.json(validatedBookings);
}

export const getBookingByIdController = (req: Request, res: Response): void => {
    const booking = BookingService.getBookingById(req.params.id);
    if (!booking) {
        res.status(404).json({ message: BookingValidator.getErrors().join('; ')});
        return;
    }

    const validatedBooking = BookingValidator.validateBooking(booking);

    if(!validatedBooking || validatedBooking.booking_id !== req.params.id) {
        res.status(400).json({ message: BookingValidator.getErrors().join('; ') });
        return;
    }
    res.json(validatedBooking);
}

export const createBookingController = (req: Request, res: Response): void => {
    const validatedBooking = BookingValidator.validateBooking(req.body);

    if (!BookingValidator.validateBooking) {
        res.status(400).json({ message: BookingValidator.getErrors().join('; ') });
        return;
    }

    const newBooking: Booking = BookingService.createBooking(validatedBooking as Booking);
    res.status(201).json(newBooking);
}

export const updateBookingController = (req: Request, res: Response): void => {
    const updatedBooking = BookingService.updateBooking(req.params.id, req.body)

    if (!updatedBooking) {
        res.status(404).json({ message: BookingValidator.getErrors().join('; ') });
        return;
    }

    const validatedBooking = BookingValidator.validateBooking(updatedBooking);

    if (!validatedBooking || validatedBooking.booking_id !== req.params.id) {
        res.status(400).json({ message: BookingValidator.getErrors().join('; ') });
        return;
    }

    res.json(validatedBooking);
}

export const deleteBookingController = (req: Request, res: Response): void => {
    const deletedBooking = BookingService.deleteBooking(req.params.id);

    if (!deletedBooking){
        res.status(404).json({ message: BookingValidator.getErrors().join('; ')});
        return;
    }

    const isValid = BookingValidator.validateBooking(deletedBooking);
    if (!isValid || deletedBooking.booking_id !== req.params.id) {
        res.status(400).json({ message: BookingValidator.getErrors().join('; ') });
        return;
    }

    res.json(deletedBooking);
}