// import { Schema, model, Document } from 'mongoose';
//
// export interface IReader extends Document {
//     fullName: string;
//     email: string;
//     contactNumber: string;
//     createdAt: Date;
// }
//
// const readerSchema = new Schema<IReader>({
//     fullName: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     contactNumber: { type: String },
//     createdAt: { type: Date, default: Date.now },
// });
//
// export const ReaderModel = model<IReader>('Reader', readerSchema);
