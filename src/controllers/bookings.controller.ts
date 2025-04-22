import { Request, Response } from 'express';
import { Booking } from '../interfaces/Booking';
import * as BookingService from '../services/bookings.service'
import { validateBooking, validateBookingList } from '../validators/BookingValidator';

let bookings: Booking[] = [];

export const getAllBookingsController = (_req: Request, res: Response): void => {
    const bookings = BookingService.getAllBookings();
    const validatedBookings = validateBookingList(bookings);

    if(!validatedBookings) {
        res.status(500).json({ message: "Invalid booking data format" });
        return;
    }

    res.json(validatedBookings);
}

export const getBookingByIdController = (req: Request, res: Response): void => {
    const booking = BookingService.getBookingById(req.params.id);
    if (!booking) {
        res.status(404).json({ message: 'Booking not found' });
        return;
    }

    const validatedBooking = validateBooking(booking);

    if(!validatedBooking || validatedBooking.booking_id !== req.params.id) {
        res.status(400).json({ message: 'Invalid booking data' });
        return;
    }
    res.json(validatedBooking);
}

export const createBookingController = (req: Request, res: Response): void => {
    const validatedBooking = validateBooking(req.body);

    if (!validateBooking) {
        res.status(400).json({ message: "Invalid booking format" });
        return;
    }

    const newBooking: Booking = BookingService.createBooking(validatedBooking as Booking);
    res.status(201).json(newBooking);
}

export const updateBookingController = (req: Request, res: Response): void => {
    const updatedBooking = BookingService.updateBooking(req.params.id, req.body)

    if (!updatedBooking) {
        res.status(404).json({ message: 'Booking not found' });
        return;
    }

    const validatedBooking = validateBooking(updatedBooking);

    if (!validatedBooking || validatedBooking.booking_id !== req.params.id) {
        res.status(400).json({ message: 'Invalid updated booking data' });
        return;
    }

    res.json(validatedBooking);
}

export const deleteBookingController = (req: Request, res: Response): void => {
    const deletedBooking = BookingService.deleteBooking(req.params.id);

    if (!deletedBooking){
        res.status(404).json({ message: 'Booking not found'});
        return;
    }

    const isValid = validateBooking(deletedBooking);
    if (!isValid || deletedBooking.booking_id !== req.params.id) {
        res.status(400).json({ message: 'Deleted booking data is invalid' });
        return;
    }

    res.json(deletedBooking);
}