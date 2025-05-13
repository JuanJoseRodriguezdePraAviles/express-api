import { Schema, model } from 'mongoose';
import { BookingStatus } from '../interfaces/BookingStatus';
import { Booking } from '../interfaces/Booking';
import { Model } from 'sequelize';

export class BookingModel extends Model<Booking> implements Booking {
    public ID!: string;
    public roomID!: string;
    public clientID!: string;
    public client_name?: string;
    public client_email?: string;
    public client_phone?: string;
    public order_date!: Date;
    public check_in_date!: Date;
    public check_out_date!: Date;
    public status?: BookingStatus;
    public special_request?: string;
}

