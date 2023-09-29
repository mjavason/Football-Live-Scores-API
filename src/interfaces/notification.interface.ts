import { Document } from 'mongoose';

interface INotification {
  subscription: PushSubscription | Object | any;
  room: string;
  deleted?: boolean;
}

export default INotification;
