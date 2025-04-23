import { Room } from "../interfaces/Room";

export default class RoomValidator {
    static errors: string[] = [];

    public static validateRoom = (room: any): Room | false => {
        this.errors = [];

        if (!room || typeof room !== 'object') {
            this.errors.push("Invalid object room");
        }
    
        if ('room_id' in room && typeof room.room_id !== 'string') {
            this.errors.push("Invalid room ID");
        }
        if ('room_name' in room && typeof room.room_name !== 'string') {
            this.errors.push("Invalid room name");
        }
    
        if ('room_type' in room && typeof room.room_type !== 'string') {
            this.errors.push("Invalid room type");
        }
        if ('room_floor' in room && typeof room.room_floor !== 'string') {
            this.errors.push("Invalid room floor");
        }
        if ('status' in room && typeof room.status !== 'string') {
            this.errors.push("Invalid room status");
        }
        if ('description' in room && typeof room.description !== 'string') {
            this.errors.push("Invalid room description");
        };
    
        if ('photos' in room && room.photos !== null && !Array.isArray(room.photos)) {
            this.errors.push("Invalid room photos array");
        }
        if ('offer' in room && typeof room.offer !== 'boolean') {
            this.errors.push("Invalid room offer");
        }
        if ('price' in room && typeof room.price !== 'number') {
            this.errors.push("Invalid room price");
        };
        if ('discount' in room && typeof room.discount !== 'number') {
            this.errors.push("Invalid room discount");
        }
        if ('cancellation_policy' in room && typeof room.cancellation_policy !== 'string') {
            this.errors.push("Invalid room cancellation policy");
        }
        if ('room_amenities' in room && !Array.isArray(room.room_amenities)) {
            this.errors.push("Invalid room amenities");
        }
    
        return this.errors.length === 0 ? room as Room : false;
    }
    
    public static validateRoomList = (data: any): Room[] | false => {
        if (!Array.isArray(data)) {
            this.errors.push("Invalid room list");
            return false;
        }
    
        const validatedRooms: Room[] = [];
    
        for (const item of data) {
            const validRoom = this.validateRoom(item);
            if (!validRoom) continue;
            validatedRooms.push(validRoom);
        }
        return validatedRooms;
    }

    public static getErrors = (): string[] => {
        return this.errors;
    }
}