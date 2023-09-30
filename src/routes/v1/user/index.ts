import express from 'express';
const router = express.Router();
import matchRouter from './match.route';
import isAuth from '../../../middleware/is_auth.middleware';

router.use(isAuth);
router.use('/match',matchRouter);

export default router;
