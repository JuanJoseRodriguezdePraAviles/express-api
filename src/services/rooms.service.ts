import { RoomModel } from '../schemas/room.schema';
import { Room } from '../interfaces/Room';

export const getAllRooms = async (): Promise<Room[]> => {
    const rooms = await RoomModel.find();
    return rooms;
}

export const getRoomById = async (id: string): Promise<Room | null> => {
    const room = await RoomModel.findOne({room_id: id});
    return room;
}

export const createRoom = async (newRoom: Partial<Room>): Promise<Room> => {
    const room = new RoomModel({
        ...newRoom,
        room_id: Date.now().toString()
    });
    await room.save();
    return room;
}

export const updateRoom = async (id: string, updateRoom: Partial<Room>): Promise<Room | null> => {
    const room = await RoomModel.findOneAndUpdate(
        {room_id: id},
        updateRoom,
        {new: true}
    );
    return room;
}

export const deleteRoom = async (id: string): Promise<boolean> => {
    const deleted = await RoomModel.findOneAndDelete({room_id: id});
    if(!deleted) {
        return false;
    }
    return true;
}