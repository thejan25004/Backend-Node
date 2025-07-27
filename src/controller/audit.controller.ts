import {NextFunction, Request, Response} from "express";
import {AuditLogModel} from "../models/AuditLog";

export const getAudits = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const logs = await AuditLogModel.find().sort({ timestamp: -1 }).limit(100);
        res.json(logs);
    } catch (e) {
        next(e)
    }
}