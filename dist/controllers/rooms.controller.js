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
const getAllRoomsController = async (req, res) => {
    const rooms = await RoomService.getAllRooms();
    res.json(rooms);
};
exports.getAllRoomsController = getAllRoomsController;
const getRoomByIdController = async (req, res) => {
    const room = RoomService.getRoomById(req.params.id);
    if (!room) {
        res.status(404).json({ message: room_validator_1.default.getErrors().join('; ') });
        return;
    }
    const validatedRoom = room_validator_1.default.validateRoom(room);
    if (!validatedRoom || validatedRoom._id !== req.params.id) {
        res.status(400).json({ message: room_validator_1.default.getErrors().join('; ') });
        return;
    }
    res.json(validatedRoom);
};
exports.getRoomByIdController = getRoomByIdController;
const createRoomController = async (req, res) => {
    try {
        const validatedRoom = room_validator_1.default.validateRoom(req.body);
        console.log(validatedRoom);
        if (!validatedRoom) {
            res.status(400).json({ message: room_validator_1.default.getErrors().join('; ') });
            return;
        }
        const newRoom = await RoomService.createRoom(validatedRoom);
        res.status(201).json(newRoom);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating room', error: error.message });
    }
};
exports.createRoomController = createRoomController;
const updateRoomController = async (req, res) => {
    const validatedRoom = room_validator_1.default.validateRoom(req.body);
    if (!validatedRoom) {
        res.status(404).json({ message: room_validator_1.default.getErrors().join('; ') });
        return;
    }
    const updatedRoom = await RoomService.updateRoom(req.params.id, validatedRoom);
    console.log(updatedRoom);
    res.json(updatedRoom);
};
exports.updateRoomController = updateRoomController;
const deleteRoomController = async (req, res) => {
    const sucess = await RoomService.deleteRoom(req.params.id);
    if (!sucess) {
        res.status(404).json({ message: room_validator_1.default.getErrors().join('; ') });
        return;
    }
    res.status(204).send();
};
exports.deleteRoomController = deleteRoomController;
