"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoom = exports.updateRoom = exports.createRoom = exports.getRoomById = exports.getAllRooms = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const roomsFilePath = path_1.default.join(__dirname, '../../public/Rooms.json');
const readRoomsFromFile = () => {
    const fileData = fs_1.default.readFileSync(roomsFilePath, 'utf-8');
    return JSON.parse(fileData);
};
const getAllRooms = () => {
    return readRoomsFromFile();
};
exports.getAllRooms = getAllRooms;
const getRoomById = (id) => {
    const rooms = readRoomsFromFile();
    return rooms.find(room => String(room.room_id) === id);
};
exports.getRoomById = getRoomById;
const createRoom = (newRoom) => {
    const rooms = readRoomsFromFile();
    newRoom.room_id = Date.now().toString();
    rooms.push(newRoom);
    fs_1.default.writeFileSync(roomsFilePath, JSON.stringify(rooms, null, 2), 'utf-8');
    return newRoom;
};
exports.createRoom = createRoom;
const updateRoom = (id, updateRoom) => {
    const rooms = readRoomsFromFile();
    const index = rooms.findIndex(room => String(room.room_id) === id);
    if (index !== -1) {
        rooms[index] = { ...rooms[index], ...updateRoom };
        fs_1.default.writeFileSync(roomsFilePath, JSON.stringify(rooms, null, 2), 'utf-8');
        return rooms[index];
    }
    return undefined;
};
exports.updateRoom = updateRoom;
const deleteRoom = (id) => {
    const rooms = readRoomsFromFile();
    const index = rooms.findIndex(room => String(room.room_id) === id);
    if (index !== -1) {
        const deletedRoom = rooms.splice(index, 1);
        fs_1.default.writeFileSync(roomsFilePath, JSON.stringify(rooms, null, 2), 'utf-8');
        return deletedRoom[0];
    }
    return undefined;
};
exports.deleteRoom = deleteRoom;
