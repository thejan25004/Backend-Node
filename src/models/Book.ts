import { Schema, model, Document } from 'mongoose';

export interface IBook extends Document {
    title: string;
    author: string;
    genre: string;
    isbn: string;
    available: boolean;
    createdAt: Date;
}

const bookSchema = new Schema<IBook>({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String },
    isbn: { type: String, unique: true },
    available: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
});

export const BookModel = model<IBook>('Book', bookSchema);
