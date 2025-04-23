import { Request, Response } from 'express';
import { Room } from '../interfaces/Room';
import * as RoomService from '../services/rooms.service'
import RoomValidator from '../validators/room.validator';

let rooms: Room[] = [];

export const getAllRoomsController = (_req: Request, res: Response): void => {
    const rooms = RoomService.getAllRooms();
    const validatedRooms = RoomValidator.validateRoomList(rooms);

    if(!validatedRooms) {
        res.status(500).json({ message: RoomValidator.getErrors().join('; ') });
        return;
    }

    res.json(validatedRooms);
}

export const getRoomByIdController = (req: Request, res: Response): void => {
    const room = RoomService.getRoomById(req.params.id);
    if (!room) {
        res.status(404).json({ message: RoomValidator.getErrors().join('; ') });
        return;
    }

    const validatedRoom = RoomValidator.validateRoom(room);

    if(!validatedRoom || validatedRoom.room_id !== req.params.id) {
        res.status(400).json({ message: RoomValidator.getErrors().join('; ') });
        return;
    }
    res.json(validatedRoom);
}

export const createRoomController = (req: Request, res: Response): void => {
    const validatedRoom = RoomValidator.validateRoom(req.body);

    if (!RoomValidator.validateRoom) {
        res.status(400).json({ message: RoomValidator.getErrors().join('; ') });
        return;
    }

    const newRoom: Room = RoomService.createRoom(validatedRoom as Room);
    res.status(201).json(newRoom);
}

export const updateRoomController = (req: Request, res: Response): void => {
    const updatedRoom = RoomService.updateRoom(req.params.id, req.body)

    if (!updatedRoom) {
        res.status(404).json({ message: RoomValidator.getErrors().join('; ') });
        return;
    }

    const validatedRoom = RoomValidator.validateRoom(updatedRoom);

    if (!validatedRoom || validatedRoom.room_id !== req.params.id) {
        res.status(400).json({ message: RoomValidator.getErrors().join('; ') });
        return;
    }

    res.json(validatedRoom);
}

export const deleteRoomController = (req: Request, res: Response): void => {
    const deletedRoom = RoomService.deleteRoom(req.params.id);

    if (!deletedRoom){
        res.status(404).json({ message: RoomValidator.getErrors().join('; ') });
        return;
    }

    const isValid = RoomValidator.validateRoom(deletedRoom);
    if (!isValid || deletedRoom.room_id !== req.params.id) {
        res.status(400).json({ message: RoomValidator.getErrors().join('; ') });
        return;
    }

    res.json(deletedRoom);
}