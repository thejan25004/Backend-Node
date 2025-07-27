import { Schema, model, Document, Types } from 'mongoose';

export interface ILending extends Document {
    book: Types.ObjectId;
    reader: Types.ObjectId;
    lendDate: Date;
    dueDate: Date;
    returnDate?: Date;
    isReturned: boolean;
}

const lendingSchema = new Schema<ILending>({
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    reader: { type: Schema.Types.ObjectId, ref: 'Reader', required: true },
    lendDate: { type: Date, default: Date.now },
    dueDate: { type: Date, required: false },
    returnDate: { type: Date },
    isReturned: { type: Boolean, default: false },
});

// Set dueDate before saving
lendingSchema.pre('save', function (next) {
    if (!this.dueDate) {
        const daysToAdd = 14; // 2 weeks
        this.dueDate = new Date(this.lendDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
    }
    next();
});

export const LendingModel = model<ILending>('Lending', lendingSchema);
