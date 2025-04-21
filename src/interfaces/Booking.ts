import { Amenities } from "./Amenities";
import { BookingStatus } from "./BookingStatus";
import { RoomStatus } from "./RoomStatus";
import { RoomType } from "./RoomType";

export interface Booking {
    booking_id: string,
    room_id: string,
    room_name: string,
    room_description: string,
    room_type: RoomType,
    room_price: number,
    room_status?: RoomStatus,
    room_amenities?: Amenities[],
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