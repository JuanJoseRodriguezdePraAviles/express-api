import { Amenities } from "./Amenities";
import { RoomStatus } from "./RoomStatus";
import { RoomType } from "./RoomType";

export interface Room {
    ID?: string,
    room_name: string,
    room_type?: RoomType,
    room_floor?: string,
    status?: RoomStatus,
    description?: string,
    photos?: string,
    offer?: boolean,
    price?: number,
    discount?: number,
    cancellation_policy?: string,
    room_amenities?: string
}