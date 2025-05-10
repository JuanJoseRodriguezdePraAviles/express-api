"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoom = exports.updateRoom = exports.createRoom = exports.getRoomById = exports.getAllRooms = void 0;
const room_schema_1 = require("../schemas/room.schema");
const getAllRooms = async () => {
    const rooms = await room_schema_1.RoomModel.find();
    return rooms;
};
exports.getAllRooms = getAllRooms;
const getRoomById = async (id) => {
    const room = await room_schema_1.RoomModel.findOne({ _id: id });
    return room;
};
exports.getRoomById = getRoomById;
const createRoom = async (newRoom) => {
    try {
        const room = new room_schema_1.RoomModel({
            ...newRoom,
        });
        await room.save();
        return room;
    }
    catch (error) {
        throw error;
    }
};
exports.createRoom = createRoom;
const updateRoom = async (id, updateRoom) => {
    const room = await room_schema_1.RoomModel.findOneAndUpdate({ _id: id }, updateRoom, { new: true });
    return room;
};
exports.updateRoom = updateRoom;
const deleteRoom = async (id) => {
    const deleted = await room_schema_1.RoomModel.findOneAndDelete({ _id: id });
    if (!deleted) {
        return false;
    }
    return true;
};
exports.deleteRoom = deleteRoom;
