import { RoomModel } from '../schemas/room.schema';
import { Room } from '../interfaces/Room';
import RoomValidator from '../validators/room.validator';

export const getAllRooms = async (): Promise<Room[]> => {
    const rooms = await RoomModel.find();
    return rooms;
}

export const getRoomById = async (id: string): Promise<Room | null> => {
    const room = await RoomModel.findOne({ _id: id });
    return room;
}

export const createRoom = async (newRoom: Partial<Room>): Promise<Room> => {
    try {
        const validatedRoom = RoomValidator.validateRoom(newRoom);
        console.log(validatedRoom);
        if (!validatedRoom) {
            throw new Error(`Room validation failed: ${RoomValidator.errors.join(', ')}`);
        }

        const room = new RoomModel({
            ...newRoom,
        });
        await room.save();
        return room;
    } catch(error) {
        throw error;
    }
    
}

export const updateRoom = async (id: string, updateRoom: Partial<Room>): Promise<Room | null> => {
    const room = await RoomModel.findOneAndUpdate(
        { _id: id },
        updateRoom,
        { new: true }
    );
    return room;
}

export const deleteRoom = async (id: string): Promise<boolean> => {
    const deleted = await RoomModel.findOneAndDelete({ room_id: id });
    if (!deleted) {
        return false;
    }
    return true;
}