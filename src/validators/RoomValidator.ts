import { Room } from "../interfaces/Room";

export const validateRoom = (room: any): Room | false => {
    if (!room || typeof room !== 'object') return false;

    if ('room_id' in room && typeof room.room_id !== 'string') return false;
    if ('room_name' in room && typeof room.room_name !== 'string') return false;

    if ('room_type' in room && typeof room.room_type !== 'string') return false;
    if ('room_floor' in room && typeof room.room_floor !== 'string') return false;
    if ('status' in room && typeof room.status !== 'string') return false;
    if ('description' in room && typeof room.description !== 'string') return false;

    if ('photos' in room && room.photos !== null && !Array.isArray(room.photos)) return false;
    if ('offer' in room && typeof room.offer !== 'boolean') return false;
    if ('price' in room && typeof room.price !== 'number') return false;
    if ('discount' in room && typeof room.discount !== 'number') return false;
    if ('cancellation_policy' in room && typeof room.cancellation_policy !== 'string') return false;

    if ('room_amenities' in room && !Array.isArray(room.room_amenities)) return false;

    return room as Room;
}

export const validateRoomList = (data: any): Room[] | false => {
    if (!Array.isArray(data)) return false;

    const validatedRooms: Room[] = [];

    for (const item of data) {
        const validRoom = validateRoom(item);
        if (!validRoom) return false;
        validatedRooms.push(validRoom);
    }
    return validatedRooms;
}