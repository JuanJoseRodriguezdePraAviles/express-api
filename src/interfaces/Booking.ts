import { Amenities } from "./Amenities";
import { BookingStatus } from "./BookingStatus";
import { RoomStatus } from "./RoomStatus";
import { RoomType } from "./RoomType";

export interface Booking {
    _id?: string,
    room_id: string,
    client_id: string,
    client_name?: string,
    client_email?: string,
    client_phone?: string,
    order_date?: Date,
    check_in_date?: Date,
    check_out_date?: Date,
    status?: BookingStatus,
    special_request?: string
}