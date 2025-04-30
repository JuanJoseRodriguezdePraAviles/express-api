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

export const createBookingController = async (req: Request, res: Response): Promise<void> => {
    const validatedBooking = BookingValidator.validateBooking(req.body);

    if (!BookingValidator.validateBooking) {
        res.status(400).json({ message: BookingValidator.getErrors().join('; ') });
        return;
    }

    const newBooking: Booking = await BookingService.createBooking(validatedBooking as Booking);
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

export const deleteBookingController = async (req: Request, res: Response): Promise<void> => {
    const success = await BookingService.deleteBooking(req.params.id);

    if (!success){
        res.status(404).json({ message: BookingValidator.getErrors().join('; ')});
        return;
    }

    res.status(204).send();
}