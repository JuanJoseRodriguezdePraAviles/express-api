import { Router } from 'express';
import {
    getAllEmployeesController,
    getEmployeeByIdController,
    createEmployeeController,
    updateEmployeeController,
    deleteEmployeeController
} from '../controllers/employees.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticateToken, getAllEmployeesController);
router.get('/:id', authenticateToken, getEmployeeByIdController);
router.post('/', authenticateToken, createEmployeeController);
router.put('/:id', authenticateToken, updateEmployeeController);
router.delete('/:id', authenticateToken, deleteEmployeeController);

export default router;