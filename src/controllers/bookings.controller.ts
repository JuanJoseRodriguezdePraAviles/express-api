import { Request, Response } from 'express';
import { Booking } from '../interfaces/Booking';
import * as BookingService from '../services/bookings.service'
import BookingValidator from '../validators/booking.validator';

let bookings: Booking[] = [];

export const getAllBookingsController = async (req: Request, res: Response): Promise<void> => {
    const bookings = await BookingService.getAllBookings();
    res.json(bookings);
}

export const getBookingByIdController = (req: Request, res: Response): void => {
    const booking = BookingService.getBookingById(req.params.id);
    if (!booking) {
        res.status(404).json({ message: BookingValidator.getErrors().join('; ') });
        return;
    }

    const validatedBooking = BookingValidator.validateBooking(booking);

    if (!validatedBooking || validatedBooking._id !== req.params.id) {
        res.status(400).json({ message: BookingValidator.getErrors().join('; ') });
        return;
    }
    res.json(validatedBooking);
}

export const createBookingController = async (req: Request, res: Response): Promise<void> => {
    try {
        const validatedBooking = BookingValidator.validateBooking(req.body);

        if (!validatedBooking) {
            res.status(400).json({ message: BookingValidator.getErrors().join('; ') });
            return;
        }

        const newBooking: Booking = await BookingService.createBooking(validatedBooking as Booking);
        res.status(201).json(newBooking);
    } catch (error: any) {
        res.status(500).json({message: 'Error creating booking', error: (error as Error).message});
    }
    
}

export const updateBookingController = async (req: Request, res: Response): Promise<void> => {
    const validatedBooking = BookingValidator.validateBooking(req.body);

    if (!validatedBooking) {
        res.status(404).json({ message: BookingValidator.getErrors().join('; ') });
        return;
    }
    console.log(validatedBooking);
    const updatedBooking = await BookingService.updateBooking(req.params.id, validatedBooking);

    res.json(updatedBooking);
}

export const deleteBookingController = async (req: Request, res: Response): Promise<void> => {
    const success = await BookingService.deleteBooking(req.params.id);

    if (!success) {
        res.status(404).json({ message: BookingValidator.getErrors().join('; ') });
        return;
    }

    res.status(204).send();
}