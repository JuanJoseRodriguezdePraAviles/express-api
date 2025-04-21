import { Router } from 'express';
import {
    getAllRoomsController,
    getRoomByIdController,
    createRoomController,
    updateRoomController,
    deleteRoomController
} from '../controllers/rooms.controller';

const router = Router();

router.get('/', getAllRoomsController);
router.get('/:id', getRoomByIdController);
router.post('/', createRoomController);
router.put('/:id', updateRoomController);
router.delete('/:id', deleteRoomController);

export default router;
