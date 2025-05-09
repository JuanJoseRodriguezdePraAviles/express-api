"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const RoomStatus_1 = require("../interfaces/RoomStatus");
class RoomValidator {
}
_a = RoomValidator;
RoomValidator.errors = [];
RoomValidator.validateRoom = (room) => {
    _a.errors = [];
    if (!room || typeof room !== 'object') {
        _a.errors.push("Invalid object room");
    }
    if ('_id' in room && typeof room._id !== 'string') {
        _a.errors.push("Invalid room ID");
    }
    if (!('room_name' in room) || typeof room.room_name !== 'string') {
        _a.errors.push("Invalid room name");
    }
    if ('room_type' in room && typeof room.room_type !== 'string') {
        _a.errors.push("Invalid room type");
    }
    if ('room_floor' in room && typeof room.room_floor !== 'string') {
        _a.errors.push("Invalid room floor");
    }
    if ('status' in room) {
        if (typeof room.status !== 'string') {
            _a.errors.push("Room status must be a string");
        }
        else if (!Object.values(RoomStatus_1.RoomStatus).includes(room.status)) {
            _a.errors.push("Invalid room status");
        }
    }
    if ('description' in room && typeof room.description !== 'string') {
        _a.errors.push("Invalid room description");
    }
    if ('photos' in room && !Array.isArray(room.photos)) {
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
    console.log(_a.errors);
    return _a.errors.length === 0 ? room : false;
};
RoomValidator.validateRoomList = (data) => {
    if (!Array.isArray(data)) {
        _a.errors.push("Invalid room list (not an array)");
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
