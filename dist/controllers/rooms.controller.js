"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoomController = exports.updateRoomController = exports.createRoomController = exports.getRoomByIdController = exports.getAllRoomsController = void 0;
const RoomService = __importStar(require("../services/rooms.service"));
const room_validator_1 = __importDefault(require("../validators/room.validator"));
let rooms = [];
const getAllRoomsController = (req, res) => {
    const rooms = RoomService.getAllRooms();
    const validatedRooms = room_validator_1.default.validateRoomList(rooms);
    if (!validatedRooms) {
        res.status(500).json({ message: room_validator_1.default.getErrors().join('; ') });
        return;
    }
    res.json(validatedRooms);
};
exports.getAllRoomsController = getAllRoomsController;
const getRoomByIdController = (req, res) => {
    const room = RoomService.getRoomById(req.params.id);
    if (!room) {
        res.status(404).json({ message: room_validator_1.default.getErrors().join('; ') });
        return;
    }
    const validatedRoom = room_validator_1.default.validateRoom(room);
    if (!validatedRoom || validatedRoom.room_id !== req.params.id) {
        res.status(400).json({ message: room_validator_1.default.getErrors().join('; ') });
        return;
    }
    res.json(validatedRoom);
};
exports.getRoomByIdController = getRoomByIdController;
const createRoomController = (req, res) => {
    const validatedRoom = room_validator_1.default.validateRoom(req.body);
    if (!room_validator_1.default.validateRoom) {
        res.status(400).json({ message: room_validator_1.default.getErrors().join('; ') });
        return;
    }
    const newRoom = RoomService.createRoom(validatedRoom);
    res.status(201).json(newRoom);
};
exports.createRoomController = createRoomController;
const updateRoomController = (req, res) => {
    const updatedRoom = RoomService.updateRoom(req.params.id, req.body);
    if (!updatedRoom) {
        res.status(404).json({ message: room_validator_1.default.getErrors().join('; ') });
        return;
    }
    const validatedRoom = room_validator_1.default.validateRoom(updatedRoom);
    if (!validatedRoom || validatedRoom.room_id !== req.params.id) {
        res.status(400).json({ message: room_validator_1.default.getErrors().join('; ') });
        return;
    }
    res.json(validatedRoom);
};
exports.updateRoomController = updateRoomController;
const deleteRoomController = (req, res) => {
    const deletedRoom = RoomService.deleteRoom(req.params.id);
    if (!deletedRoom) {
        res.status(404).json({ message: room_validator_1.default.getErrors().join('; ') });
        return;
    }
    const isValid = room_validator_1.default.validateRoom(deletedRoom);
    if (!isValid || deletedRoom.room_id !== req.params.id) {
        res.status(400).json({ message: room_validator_1.default.getErrors().join('; ') });
        return;
    }
    res.json(deletedRoom);
};
exports.deleteRoomController = deleteRoomController;
