import mongoose from 'mongoose';
import { t } from 'vld-ts';

export const RegisterUser = t.obj({
    email: t.str({ minLength: 3 }),
    password: t.str({ minLength: 3 })
});

export type Subscription = 'free' | 'premium'

export type User = {
    email: String,
    password: String,
    emailVerified?: Boolean,
    mobile?: String,
    mobileVerified?: Boolean,
    createdDate?: Date,
    subscription?: Subscription,
    suspended?: Boolean,
    blacklisted?: Boolean,
    resetPassword?: Boolean,
    token?: String,
    uid?: String
}



const mongoSchema = new mongoose.Schema({
    email: { type: String, default: '' },
    password: { type: String, default: '' },
    emailVerified: { type: Boolean, default: false },
    mobile: { type: String, default: '' },
    mobileVerified: { type: Boolean, default: false },
    createdDate: { type: Date, default: new Date() },
    subscription: { type: String, default: 'free' },
    suspended: { type: Boolean, default: false },
    blacklisted: { type: Boolean, default: false },
    token: { type: String, default: new mongoose.Types.ObjectId().toString() },
    uid: { type: String, default: new mongoose.Types.ObjectId().toString() },
});



const Users = mongoose.model('Users', mongoSchema, 'users');

export default Users;