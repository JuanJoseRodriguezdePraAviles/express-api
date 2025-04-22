import { Amenities } from "./Amenities";
import { RoomStatus } from "./RoomStatus";
import { RoomType } from "./RoomType";

export interface Room {
room_id: string,
    room_name?: string,
    room_type?: RoomType,
    room_floor?: string,
    status?: RoomStatus,
    description?: string,
    photos?: [],
    offer?: boolean,
    price?: number,
    discount?: number,
    cancellation_policy?: string,
    room_amenities?: Amenities[]
}