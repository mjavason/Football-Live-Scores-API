import express from 'express';
import authRoute from './auth.route';
import notificationRoute from './notification.route';
const router = express.Router();

router.use('/auth', authRoute);
router.use('/notification', notificationRoute);
export default router;
