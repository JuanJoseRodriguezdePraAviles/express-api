import { Request, Response } from 'express';
import { Room } from '../interfaces/Room';
import * as RoomService from '../services/rooms.service'
import RoomValidator from '../validators/room.validator';

let rooms: Room[] = [];

export const getAllRoomsController = async (req: Request, res: Response): Promise<void> => {
    const rooms = await RoomService.getAllRooms();
    res.json(rooms);
}

export const getRoomByIdController = async (req: Request, res: Response): Promise<void> => {
    const room = RoomService.getRoomById(req.params.id);
    res.json(room);
}

export const createRoomController = async (req: Request, res: Response): Promise<void> => {
    try {
        const validatedRoom = RoomValidator.validateRoom(req.body);
        if (!validatedRoom) {
            res.status(400).json({ message: RoomValidator.getErrors().join('; ') });
            return;
        }

        const newRoom: Room = await RoomService.createRoom(validatedRoom as Room);
        res.status(201).json(newRoom);
    } catch (error:  any) {
        res.status(500).json({message: 'Error creating room', error: (error as Error).message});
    }
}

export const updateRoomController = async (req: Request, res: Response): Promise<void> => {
    const validatedRoom = RoomValidator.validateRoom(req.body);
    
    if (!validatedRoom) {
        res.status(404).json({ message: RoomValidator.getErrors().join('; ') });
        return;
    }
    
    const updatedRoom = await RoomService.updateRoom(req.params.id, validatedRoom);
    console.log(updatedRoom);
    res.json(updatedRoom);
}

export const deleteRoomController = async (req: Request, res: Response): Promise<void> => {
    const sucess = await RoomService.deleteRoom(req.params.id);

    if (!sucess) {
        res.status(404).json({ message: 'Delete failed' });
        return;
    }

    res.status(204).send();
}