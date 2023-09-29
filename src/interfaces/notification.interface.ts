import { Document } from "mongoose";

interface INotification {
    subscription: PushSubscription | Object | any;
    role: string;
    deleted?: boolean;
}

export default INotification;
