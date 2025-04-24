import { Router } from 'express';
import {
    getAllEmployeesController,
    getEmployeeByIdController,
    createEmployeeController,
    updateEmployeeController,
    deleteEmployeeController
} from '../controllers/employees.controller';

const router = Router();

router.get('/', getAllEmployeesController);
router.get('/:id', getEmployeeByIdController);
router.post('/', createEmployeeController);
router.put('/:id', updateEmployeeController);
router.delete('/:id', deleteEmployeeController);

export default router;