import { RoomModel } from '../schemas/room.schema';
import { Room } from '../interfaces/Room';
import { sequelize } from '../config/database';

export const getAllRooms = async (): Promise<Room[]> => {
    const [rooms] = await sequelize.query('SELECT * FROM room');
    return rooms as Room[];
}

export const getRoomById = async (id: string): Promise<Room | null> => {
    const [results] = await sequelize.query('SELECT * FROM room WHERE id = :id', {
        replacements: { id }
    });
    const rooms = results as Room[];
    return rooms[0] || null;
}

export const createRoom = async (newRoom: Partial<Room>): Promise<Room> => {
    if (!newRoom.roomName) {
        throw new Error("Missing required room fields");
    }
    const [results] = await sequelize.query(
        `INSERT INTO room (
            id, roomName, roomType, roomFloor, status, description, photos, offer, price, discount,
            cancellationPolicy, roomAmenities
        ) VALUES (
            :id, :roomName, :roomType, :roomFloor, :status, :description, :photos, :offer, :price, :discount,
            :cancellationPolicy, :roomAmenities 
        )`,
         {
            replacements: {
                id: newRoom.id,
                roomName: newRoom.roomName,
                roomType: newRoom.roomType,
                roomFloor: newRoom.roomFloor,
                status: newRoom.status,
                description: newRoom.description,
                photos: newRoom.photos,
                offer: newRoom.offer,
                price: newRoom.price,
                discount: newRoom.discount,
                cancellationPolicy: newRoom.cancellationPolicy,
                roomAmenities: newRoom.roomAmenities
            }
         }
    );
    return (results as Room[])[0];
}

export const updateRoom = async (id: string, updateRoom: Partial<Room>): Promise<Room | null> => {
    const fields = Object.keys(updateRoom);
    if(fields.length === 0) return null;

    const setClause = fields.map((field, i) => `${field} = :value${i}`).join(', ');
    const replacements: Record<string, any> = { id };
    fields.forEach((field, i) => {
        replacements[`value${i}`] = (updateRoom as any)[field];
    });

    const [results] = await sequelize.query(
        `UPDATE room SET ${setClause} WHERE id = :id`,
        { replacements }
    );
    return (results as Room[])[0] || null;
}

export const deleteRoom = async (id: string): Promise<boolean> => {
    const [results] = await sequelize.query('DELETE FROM room WHERE id = :id', {
        replacements: { id }
    });
    return true;
}