import { Request, Response } from 'express';
import { Room } from '../interfaces/Room';
import * as RoomService from '../services/rooms.service'

let rooms: Room[] = [];

export const getAllRoomsController = (_req: Request, res: Response): void => {
    const rooms = RoomService.getAllRooms();
    res.json(rooms);
}

export const getRoomByIdController = (req: Request, res: Response): void => {
    const room = RoomService.getRoomById(req.params.id);
    if (!room) {
        res.status(404).json({ message: 'Room not found' });
        return;
    }
    res.json(room);
}

export const createRoomController = (req: Request, res: Response): void => {
    const newRoom: Room = RoomService.createRoom(req.body);
    res.status(201).json(newRoom);
}

export const updateRoomController = (req: Request, res: Response): void => {
    const updatedRoom = RoomService.updateRoom(req.params.id, req.body)

    if (!updatedRoom) {
        res.status(404).json({ message: 'Room not found'});
        return;
    }

    res.json(updatedRoom);
}

export const deleteRoomController = (req: Request, res: Response): void => {
    const deletedRoom = RoomService.deleteRoom(req.params.id);

    if (!deletedRoom){
        res.status(404).json({ message: 'Room not found'});
        return;
    }

    res.json(deletedRoom);
}