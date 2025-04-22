import { Request, Response } from 'express';
import { Room } from '../interfaces/Room';
import * as RoomService from '../services/rooms.service'
import { validateRoom, validateRoomList } from '../validators/RoomValidator';

let rooms: Room[] = [];

export const getAllRoomsController = (_req: Request, res: Response): void => {
    const rooms = RoomService.getAllRooms();
    const validatedRooms = validateRoomList(rooms);

    if(!validatedRooms) {
        res.status(500).json({ message: "Invalid room data format" });
        return;
    }

    res.json(validatedRooms);
}

export const getRoomByIdController = (req: Request, res: Response): void => {
    const room = RoomService.getRoomById(req.params.id);
    if (!room) {
        res.status(404).json({ message: 'Room not found' });
        return;
    }

    const validatedRoom = validateRoom(room);

    if(!validatedRoom || validatedRoom.room_id !== req.params.id) {
        res.status(400).json({ message: 'Invalid room data' });
        return;
    }
    res.json(validatedRoom);
}

export const createRoomController = (req: Request, res: Response): void => {
    const validatedRoom = validateRoom(req.body);

    if (!validateRoom) {
        res.status(400).json({ message: "Invalid room format" });
        return;
    }

    const newRoom: Room = RoomService.createRoom(validatedRoom as Room);
    res.status(201).json(newRoom);
}

export const updateRoomController = (req: Request, res: Response): void => {
    const updatedRoom = RoomService.updateRoom(req.params.id, req.body)

    if (!updatedRoom) {
        res.status(404).json({ message: 'Room not found' });
        return;
    }

    const validatedRoom = validateRoom(updatedRoom);

    if (!validatedRoom || validatedRoom.room_id !== req.params.id) {
        res.status(400).json({ message: 'Invalid updated room data' });
        return;
    }

    res.json(validatedRoom);
}

export const deleteRoomController = (req: Request, res: Response): void => {
    const deletedRoom = RoomService.deleteRoom(req.params.id);

    if (!deletedRoom){
        res.status(404).json({ message: 'Room not found'});
        return;
    }

    const isValid = validateRoom(deletedRoom);
    if (!isValid || deletedRoom.room_id !== req.params.id) {
        res.status(400).json({ message: 'Deleted room data is invalid' });
        return;
    }

    res.json(deletedRoom);
}