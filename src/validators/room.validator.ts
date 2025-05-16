import { Room } from "../interfaces/Room";
import { RoomStatus } from "../interfaces/RoomStatus";

export default class RoomValidator {
    static errors: string[] = [];

    public static validateRoom = (room: any): Room | false => {
        this.errors = [];
        if (!room || typeof room !== 'object') {
            this.errors.push("Invalid object room");
        }
        if ('ID' in room && typeof room.id !== 'string') {
            this.errors.push("Invalid room ID");
        }
        if (!('room_name' in room) || typeof room.roomName !== 'string') {
            this.errors.push("Invalid room name");
        }
        if ('room_type' in room && typeof room.roomType !== 'string') {
            this.errors.push("Invalid room type");
        }
        if ('room_floor' in room && typeof room.roomFloor !== 'string') {
            this.errors.push("Invalid room floor");
        }
        if ('status' in room) {
            if (typeof room.status !== 'string') {
                this.errors.push("Room status must be a string");
            } else if (!Object.values(RoomStatus).includes(room.status as RoomStatus)) {
                this.errors.push("Invalid room status");
            }
        }
        if ('description' in room && typeof room.description !== 'string') {
            this.errors.push("Invalid room description");
        }
        if ('photos' in room && typeof room.photos != 'string') {
            this.errors.push("Invalid room photos array");
        }
        if ('offer' in room && typeof room.offer !== 'number') {
            this.errors.push("Invalid room offer");
        }
        if ('price' in room && typeof room.price !== 'number') {
            this.errors.push("Invalid room price");
        };
        if ('discount' in room && typeof room.discount !== 'number') {
            this.errors.push("Invalid room discount");
        }
        if ('cancellation_policy' in room && typeof room.cancellationPolicy !== 'string') {
            this.errors.push("Invalid room cancellation policy");
        }
        if ('room_amenities' in room && typeof room.roomAmenities !='string') {
            this.errors.push("Invalid room amenities");
        }
        return this.errors.length === 0 ? room as Room : false;
    }

    public static validateRoomList = (data: any): Room[] | false => {
        if (!Array.isArray(data)) {
            this.errors.push("Invalid room list (not an array)");
            return false;
        }

        const validatedRooms: Room[] = [];

        for (const item of data) {
            const validRoom = this.validateRoom(item);
            if (!validRoom) continue;
            validatedRooms.push(validRoom);
        }

        return validatedRooms.length === 0 ? false : validatedRooms;
    }

    public static getErrors = (): string[] => {
        return this.errors;
    }
}