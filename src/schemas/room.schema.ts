import { Schema, model } from 'mongoose';
import { RoomStatus } from '../interfaces/RoomStatus';
import { RoomType } from '../interfaces/RoomType';
import { Room } from '../interfaces/Room';

const RoomSchema = new Schema<Room>({
    room_id: {type: String, required: true},
    room_name: {type: String},
    room_type: {type: String, enum: Object.values(RoomType)},
    room_floor: {type: String},
    status: {type: String, enum: Object.values(RoomStatus)},
    description: {type: String},
    photos: [{type: String}],
    offer: {type: Boolean},
    price: {type: Number},
    discount: {type: Number},
    cancellation_policy: {type: String},
    room_amenities: [{type:String}]
});

export const RoomModel = model<Room>('Room', RoomSchema);