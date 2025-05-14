import { RoomModel } from '../schemas/room.schema';
import { Room } from '../interfaces/Room';
import { sequelize } from '../config/database';

export const getAllRooms = async (): Promise<Room[]> => {
    const [rooms] = await sequelize.query('SELECT * FROM room');
    return rooms as Room[];
}

export const getRoomById = async (id: string): Promise<Room | null> => {
    const [results] = await sequelize.query('SELECT * FROM room WHERE ID = :id', {
        replacements: { id }
    });
    const rooms = results as Room[];
    return rooms[0] || null;
}

export const createRoom = async (newRoom: Partial<Room>): Promise<Room> => {
    if (!newRoom.room_name) {
        throw new Error("Missing required room fields");
    }
    const [results] = await sequelize.query(
        `INSERT INTO room (
            room_name, room_type, room_floor, status, description, photos, offer, price, discount,
            cancellation_policy, room_amenities
        ) VALUES (
            :room_name, :room_type, :room_floor, :status, :description, :photos, :offer, :price, :discount,
            :cancellation_policy, :room_amenities 
        ) RETURNING *`,
         {
            replacements: {
                room_name: newRoom.room_name,
                room_type: newRoom.room_type,
                room_floor: newRoom.room_floor,
                status: newRoom.status,
                description: newRoom.description,
                photos: newRoom.photos,
                offer: newRoom.offer,
                price: newRoom.price,
                discount: newRoom.discount,
                cancellation_policy: newRoom.cancellation_policy,
                room_amenities: newRoom.room_amenities
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
        `UPDATE room SET ${setClause} WHERE id = :id RETURNING *`,
        { replacements }
    );
    return (results as Room[])[0] || null;
}

export const deleteRoom = async (id: string): Promise<boolean> => {
    const [results] = await sequelize.query('DELETE FROM room WHERE ID = :id', {
        replacements: { id }
    });
    return true;
}