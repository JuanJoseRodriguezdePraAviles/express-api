"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
class RoomValidator {
}
_a = RoomValidator;
RoomValidator.errors = [];
RoomValidator.validateRoom = (room) => {
    _a.errors = [];
    if (!room || typeof room !== 'object') {
        _a.errors.push("Invalid object room");
    }
    if ('room_id' in room && typeof room.room_id !== 'string') {
        _a.errors.push("Invalid room ID");
    }
    if ('room_name' in room && typeof room.room_name !== 'string') {
        _a.errors.push("Invalid room name");
    }
    if ('room_type' in room && typeof room.room_type !== 'string') {
        _a.errors.push("Invalid room type");
    }
    if ('room_floor' in room && typeof room.room_floor !== 'string') {
        _a.errors.push("Invalid room floor");
    }
    if ('status' in room && typeof room.status !== 'string') {
        _a.errors.push("Invalid room status");
    }
    if ('description' in room && typeof room.description !== 'string') {
        _a.errors.push("Invalid room description");
    }
    ;
    if ('photos' in room && room.photos !== null && !Array.isArray(room.photos)) {
        _a.errors.push("Invalid room photos array");
    }
    if ('offer' in room && typeof room.offer !== 'boolean') {
        _a.errors.push("Invalid room offer");
    }
    if ('price' in room && typeof room.price !== 'number') {
        _a.errors.push("Invalid room price");
    }
    ;
    if ('discount' in room && typeof room.discount !== 'number') {
        _a.errors.push("Invalid room discount");
    }
    if ('cancellation_policy' in room && typeof room.cancellation_policy !== 'string') {
        _a.errors.push("Invalid room cancellation policy");
    }
    if ('room_amenities' in room && !Array.isArray(room.room_amenities)) {
        _a.errors.push("Invalid room amenities");
    }
    return _a.errors.length === 0 ? room : false;
};
RoomValidator.validateRoomList = (data) => {
    if (!Array.isArray(data)) {
        _a.errors.push("Invalid room list");
        return false;
    }
    const validatedRooms = [];
    for (const item of data) {
        const validRoom = _a.validateRoom(item);
        if (!validRoom)
            continue;
        validatedRooms.push(validRoom);
    }
    return validatedRooms.length === 0 ? false : validatedRooms;
};
RoomValidator.getErrors = () => {
    return _a.errors;
};
exports.default = RoomValidator;
