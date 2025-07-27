import {NextFunction, Request, Response} from 'express';
import { LendingModel } from '../models/Lending';
import {BookModel} from '../models/Book';
import {APIError} from "../errors/ApiError";
import {logAudit} from "../util/auditLogger";
import {ReaderModel} from "../models/Reader";

export const lendBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { book, reader } = req.body;

        const lending = new LendingModel({
            book,
            reader,
        });

        await lending.save();

        const bookDb = await BookModel.findByIdAndUpdate(lending.book, { available: false });
        if (!bookDb) {
            throw new APIError(404, "Book not found");
        }

        const readerDb = await ReaderModel.findById(lending.reader);
        if (!readerDb) {
            throw new APIError(404, "Reader not found");
        }

        await logAudit("LEND_BOOK", `Lent book "${bookDb.title}" to ${readerDb.fullName}`);

        res.status(201).json(lending);
    } catch (error) {
        next(error);
        // res.status(400).json({ error: 'Failed to lend book' });
    }
};

export const returnBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const lending = await LendingModel.findById(id);
        if (!lending || lending.isReturned) {
            throw new APIError(404, 'Lending record not found or already returned');
        }

        lending.returnDate = new Date();
        lending.isReturned = true;
        await lending.save();

        const book = await BookModel.findByIdAndUpdate(lending.book, { available: true });
        if (!book) {
            throw new APIError(404, "Book not found");
        }

        const reader = await ReaderModel.findById(lending.reader);
        if (!reader) {
            throw new APIError(404, "Reader not found");
        }

        await logAudit("RETURN_BOOK", `Returned book "${book.title}" from ${reader.fullName}`);

        res.json({ message: 'Book returned successfully' });

    } catch (error) {
        next(error);
        // res.status(400).json({ error: 'Failed to return book' });
    }
};

export const getLendingHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lendings = await LendingModel.find()
            .populate('book')
            .populate('reader');
        res.json(lendings);
    } catch (error) {
        next(error);
        // res.status(500).json({ error: 'Failed to fetch lending history' });
    }
};

export const getOverdueBooks = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const today = new Date();
        const overdue = await LendingModel.find({
            dueDate: { $lt: today },
            isReturned: false,
        }).populate('reader').populate('book');

        res.json(overdue);
    } catch (error) {
        next(error);
        // res.status(500).json({ error: 'Failed to fetch overdue books' });
    }
};
