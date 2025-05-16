import { Amenities } from "./Amenities";
import { RoomStatus } from "./RoomStatus";
import { RoomType } from "./RoomType";

export interface Room {
    id?: string,
    roomName: string,
    roomType?: RoomType,
    roomFloor?: string,
    status?: RoomStatus,
    description?: string,
    photos?: string,
    offer?: boolean,
    price?: number,
    discount?: number,
    cancellationPolicy?: string,
    roomAmenities?: string
}