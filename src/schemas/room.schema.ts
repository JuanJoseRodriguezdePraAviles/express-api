import { Schema, model } from 'mongoose';
import { RoomStatus } from '../interfaces/RoomStatus';
import { RoomType } from '../interfaces/RoomType';
import { Room } from '../interfaces/Room';

const RoomSchema = new Schema<Room>({
    roomName: {type: String, required: true},
    roomType: {type: String, enum: Object.values(RoomType)},
    roomFloor: {type: String},
    status: {type: String, enum: Object.values(RoomStatus)},
    description: {type: String},
    photos: [{type: String}],
    offer: {type: Boolean},
    price: {type: Number},
    discount: {type: Number},
    cancellationPolicy: {type: String},
    roomAmenities: [{type:String}]
});

export const RoomModel = model<Room>('Room', RoomSchema);