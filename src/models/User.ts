import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password: string;
    role: 'admin' | 'staff';
}

const userSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'staff'], default: 'staff' },
});

export const UserModel = model<IUser>('User', userSchema);
