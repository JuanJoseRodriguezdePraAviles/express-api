import { Router } from 'express';
import {
    getAllRoomsController,
    getRoomByIdController,
    createRoomController,
    updateRoomController,
    deleteRoomController
} from '../controllers/rooms.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticateToken, getAllRoomsController);
router.get('/:id', authenticateToken, getRoomByIdController);
router.post('/', authenticateToken, createRoomController);
router.put('/:id', authenticateToken, updateRoomController);
router.delete('/:id', authenticateToken, deleteRoomController);

export default router;