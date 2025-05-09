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
const getAllBookingsController = async (req, res) => {
    const bookings = await BookingService.getAllBookings();
    res.json(bookings);
};
exports.getAllBookingsController = getAllBookingsController;
const getBookingByIdController = async (req, res) => {
    const booking = BookingService.getBookingById(req.params.id);
    if (!booking) {
        res.status(404).json({ message: booking_validator_1.default.getErrors().join('; ') });
        return;
    }
    const validatedBooking = booking_validator_1.default.validateBooking(booking);
    if (!validatedBooking || validatedBooking._id !== req.params.id) {
        res.status(400).json({ message: booking_validator_1.default.getErrors().join('; ') });
        return;
    }
    res.json(validatedBooking);
};
exports.getBookingByIdController = getBookingByIdController;
const createBookingController = async (req, res) => {
    try {
        const validatedBooking = booking_validator_1.default.validateBooking(req.body);
        if (!validatedBooking) {
            res.status(400).json({ message: booking_validator_1.default.getErrors().join('; ') });
            return;
        }
        const newBooking = await BookingService.createBooking(validatedBooking);
        res.status(201).json(newBooking);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating booking', error: error.message });
    }
};
exports.createBookingController = createBookingController;
const updateBookingController = async (req, res) => {
    const validatedBooking = booking_validator_1.default.validateBooking(req.body);
    if (!validatedBooking) {
        res.status(404).json({ message: booking_validator_1.default.getErrors().join('; ') });
        return;
    }
    const updatedBooking = await BookingService.updateBooking(req.params.id, validatedBooking);
    res.json(updatedBooking);
};
exports.updateBookingController = updateBookingController;
const deleteBookingController = async (req, res) => {
    const success = await BookingService.deleteBooking(req.params.id);
    if (!success) {
        res.status(404).json({ message: booking_validator_1.default.getErrors().join('; ') });
        return;
    }
    res.status(204).send();
};
exports.deleteBookingController = deleteBookingController;
