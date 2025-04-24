import { Router } from 'express';
import {
    loginController
} from '../middleware/authentication';

const router = Router();

router.post('/', loginController);

export default router;