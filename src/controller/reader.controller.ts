import {NextFunction, Request, Response} from 'express';
import { ReaderModel } from '../models/Reader';
import {APIError} from "../errors/ApiError";

export const getAllReaders = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const readers = await ReaderModel.find();
        res.json(readers);
    } catch (error) {
        next(error);
        // res.status(500).json({ error: 'Failed to fetch readers' });
    }
};

export const createReader = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reader = new ReaderModel(req.body);
        await reader.save();
        res.status(201).json(reader);
    } catch (error) {
        next(error);
        // res.status(400).json({ error: 'Failed to create reader' });
    }
};

export const updateReader = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updated = await ReaderModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) throw new APIError(404, "Reader not found");
        res.json(updated);
    } catch (error) {
        next(error);
        //res.status(400).json({ error: 'Failed to update reader' });
    }
};

export const deleteReader = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deleted = await ReaderModel.findByIdAndDelete(req.params.id);
        if (!deleted) throw new APIError(404, "Reader not found");
        res.json({ message: 'Reader deleted' });
    } catch (error) {
        next(error);
        // res.status(500).json({ error: 'Failed to delete reader' });
    }
};
