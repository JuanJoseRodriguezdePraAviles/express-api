import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { seed } from './seed';

dotenv.config();

const connString = process.env.DB_CONN_STRING || '';
const dbName = process.env.DB_NAME;

if (!connString || !dbName) {
    throw new Error('Empty MongoDB variables');
}

export const connectDB = async (): Promise<void> => {
    await mongoose.connect(connString, {
        dbName: dbName
    }).then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Conection error to MongoDB', err);
    });
}