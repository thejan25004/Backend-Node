import { AuditLogModel } from '../models/AuditLog';

export const logAudit = async (action: string, details: string) => {
    await AuditLogModel.create({ action, details });
};
