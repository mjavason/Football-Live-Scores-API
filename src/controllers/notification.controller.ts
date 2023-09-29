import { Request, Response } from 'express';
import { notificationService } from '../services';
import webpush from 'web-push';
import {
  AuthFailureResponse,
  NotFoundResponse,
  ForbiddenResponse,
  BadRequestResponse,
  InternalErrorResponse,
  SuccessMsgResponse,
  FailureMsgResponse,
  SuccessResponse,
  AccessTokenErrorResponse,
  TokenRefreshResponse,
  ForbiddenButWeMoveResponse,
} from '../helpers/response';
import { MESSAGES, PRIVATE_VAPID_KEY, PUBLIC_VAPID_KEY } from '../constants';
import INotification from '../interfaces/notification.interface';

const publicVapidKey = PUBLIC_VAPID_KEY;
const privateVapidKey = PRIVATE_VAPID_KEY;

// Setup the public and private VAPID keys to web-push library.
webpush.setVapidDetails('mailto: <orjimichael4886@gmail.com>', publicVapidKey, privateVapidKey);

class Controller {
  getStatus = async (req: Request, res: Response) => {
    const data = {};

    return SuccessResponse(res, data);
    // res.status(200).send({ message: MESSAGES.DEFAULT, succcess: true });
  };

  create = async (req: Request, res: Response) => {
    // const subscription = req.body;
    let newSubscriber = {
      subscription: req.body,
    };
    const data = await notificationService.create(newSubscriber);

    if (!data)
      return InternalErrorResponse(res, 'Unknown error occured while registering subscriber');

    const payload = JSON.stringify({
      title: `Subscription Successful!`,
      body: 'This is your first push notification',
    });

    webpush.sendNotification(data.subscription, payload).catch(console.log);
    console.log('Machine subscribed successfully');

    return SuccessResponse(res, data, 'Machine service subscribed successfully');
  };

  find = async (req: Request, res: Response) => {
    const data = await notificationService.find(req.query);

    if (!data) return InternalErrorResponse(res);

    if (data.length === 0) return NotFoundResponse(res);

    return SuccessResponse<INotification[]>(res, data);
  };

  broadcast = async (notificationTitle: string, notificationBody: string) => {
    const data = await notificationService.find({});
    if (!data) return false;
    if (data.length === 0) return false;

    for (let i = 0; i < data.length; i++) {
      try {
        const payload = JSON.stringify({ title: notificationTitle, body: notificationBody });
        webpush.sendNotification(data[i].subscription, payload).catch(console.log);
      } catch (e: any) {
        console.log(e);
      }
    }
    return true;
  };
}

export const notificationController = new Controller();
