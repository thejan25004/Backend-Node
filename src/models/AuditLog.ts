import mongoose, { Schema, Document } from 'mongoose';

export interface IAuditLog extends Document {
    action: string;
    details: string;
    timestamp: Date;
}

const auditLogSchema = new Schema<IAuditLog>({
    action: { type: String, required: true }, // e.g., "DELETE_BOOK", "LEND_BOOK"
    details: { type: String, required: true }, // additional context (e.g., which book)
    timestamp: { type: Date, default: Date.now },
});

export const AuditLogModel = mongoose.model<IAuditLog>('AuditLog', auditLogSchema);
