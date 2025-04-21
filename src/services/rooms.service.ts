import fs from 'fs';
import path from 'path';
import { Room } from '../interfaces/Room';

const roomsFilePath = path.join(__dirname, '../../public/Rooms.json');

const readRoomsFromFile = (): Room[] => {
    const fileData = fs.readFileSync(roomsFilePath, 'utf-8');
    return JSON.parse(fileData);
}

export const getAllRooms = (): Room[] => {
    return readRoomsFromFile();
}

export const getRoomById = (id: string): Room | undefined => {
    const rooms = readRoomsFromFile();
    return rooms.find(room => String(room.room_id) === id);
}

export const createRoom = (newRoom: Room): Room => {
    const rooms = readRoomsFromFile();
    newRoom.room_id = Date.now().toString();
    rooms.push(newRoom);
    fs.writeFileSync(roomsFilePath, JSON.stringify(rooms, null, 2), 'utf-8');
    return newRoom;
}

export const updateRoom = (id: string, updateRoom: Partial<Room>): Room | undefined => {
    const rooms = readRoomsFromFile();
    const index = rooms.findIndex(room => String(room.room_id) === id);

    if (index !== -1) {
        rooms[index] = { ...rooms[index], ...updateRoom };
        fs.writeFileSync(roomsFilePath, JSON.stringify(rooms, null, 2), 'utf-8');
        return rooms[index];
    }
    return undefined;
}

export const deleteRoom = (id: string): Room | undefined => {
    const rooms = readRoomsFromFile();
    const index = rooms.findIndex(room => String(room.room_id) === id);

    if (index !== -1) {
        const deletedRoom = rooms.splice(index, 1);
        fs.writeFileSync(roomsFilePath, JSON.stringify(rooms, null, 2), 'utf-8');
        return deletedRoom[0];
    }
    return undefined;
}