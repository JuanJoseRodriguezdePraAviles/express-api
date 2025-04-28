"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookingController = exports.updateBookingController = exports.createBookingController = exports.getBookingByIdController = exports.getAllBookingsController = void 0;
const BookingService = __importStar(require("../services/bookings.service"));
const booking_validator_1 = __importDefault(require("../validators/booking.validator"));
let bookings = [];
const getAllBookingsController = (req, res) => {
    const bookings = BookingService.getAllBookings();
    const validatedBookings = booking_validator_1.default.validateBookingList(bookings);
    if (!validatedBookings) {
        res.status(500).json({ message: booking_validator_1.default.getErrors().join('; ') });
        return;
    }
    res.json(validatedBookings);
};
exports.getAllBookingsController = getAllBookingsController;
const getBookingByIdController = (req, res) => {
    const booking = BookingService.getBookingById(req.params.id);
    if (!booking) {
        res.status(404).json({ message: booking_validator_1.default.getErrors().join('; ') });
        return;
    }
    const validatedBooking = booking_validator_1.default.validateBooking(booking);
    if (!validatedBooking || validatedBooking.booking_id !== req.params.id) {
        res.status(400).json({ message: booking_validator_1.default.getErrors().join('; ') });
        return;
    }
    res.json(validatedBooking);
};
exports.getBookingByIdController = getBookingByIdController;
const createBookingController = (req, res) => {
    const validatedBooking = booking_validator_1.default.validateBooking(req.body);
    if (!booking_validator_1.default.validateBooking) {
        res.status(400).json({ message: booking_validator_1.default.getErrors().join('; ') });
        return;
    }
    const newBooking = BookingService.createBooking(validatedBooking);
    res.status(201).json(newBooking);
};
exports.createBookingController = createBookingController;
const updateBookingController = (req, res) => {
    const updatedBooking = BookingService.updateBooking(req.params.id, req.body);
    if (!updatedBooking) {
        res.status(404).json({ message: booking_validator_1.default.getErrors().join('; ') });
        return;
    }
    const validatedBooking = booking_validator_1.default.validateBooking(updatedBooking);
    if (!validatedBooking || validatedBooking.booking_id !== req.params.id) {
        res.status(400).json({ message: booking_validator_1.default.getErrors().join('; ') });
        return;
    }
    res.json(validatedBooking);
};
exports.updateBookingController = updateBookingController;
const deleteBookingController = (req, res) => {
    const deletedBooking = BookingService.deleteBooking(req.params.id);
    if (!deletedBooking) {
        res.status(404).json({ message: booking_validator_1.default.getErrors().join('; ') });
        return;
    }
    const isValid = booking_validator_1.default.validateBooking(deletedBooking);
    if (!isValid || deletedBooking.booking_id !== req.params.id) {
        res.status(400).json({ message: booking_validator_1.default.getErrors().join('; ') });
        return;
    }
    res.json(deletedBooking);
};
exports.deleteBookingController = deleteBookingController;
