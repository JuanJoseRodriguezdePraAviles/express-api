import { Amenities } from "./Amenities";
import { BookingStatus } from "./BookingStatus";
import { RoomStatus } from "./RoomStatus";
import { RoomType } from "./RoomType";

export interface Booking {
    id?: string,
    roomId: string,
    clientId: string,
    clientName?: string,
    clientEmail?: string,
    clientPhone?: string,
    orderDate?: Date,
    checkInDate?: Date,
    checkOutDate?: Date,
    status?: BookingStatus,
    specialRequest?: string
}