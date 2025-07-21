// import {NextFunction, Request, Response} from 'express';
// import { LendingModel } from '../models/Lending';
// import { BookModel } from '../models/Book';
// import {APIError} from "../errors/ApiError";
//
// export const lendBook = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { book, reader, dueDate } = req.body;
//
//         const lending = new LendingModel({
//             book,
//             reader,
//             dueDate,
//         });
//
//         await lending.save();
//         await BookModel.findByIdAndUpdate(book, { available: false });
//
//         res.status(201).json(lending);
//     } catch (error) {
//         next(error);
//         // res.status(400).json({ error: 'Failed to lend book' });
//     }
// };
//
// export const returnBook = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { id } = req.params;
//
//         const lending = await LendingModel.findById(id);
//         if (!lending || lending.isReturned) {
//             throw new APIError(404, 'Lending record not found or already returned');
//         }
//
//         lending.returnDate = new Date();
//         lending.isReturned = true;
//
//         await lending.save();
//         await BookModel.findByIdAndUpdate(lending.book, { available: true });
//
//         res.json({ message: 'Book returned successfully' });
//     } catch (error) {
//         next(error);
//         // res.status(400).json({ error: 'Failed to return book' });
//     }
// };
//
// export const getLendingHistory = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const lendings = await LendingModel.find()
//             .populate('book')
//             .populate('reader');
//         res.json(lendings);
//     } catch (error) {
//         next(error);
//         // res.status(500).json({ error: 'Failed to fetch lending history' });
//     }
// };
//
// export const getOverdueBooks = async (_req: Request, res: Response, next: NextFunction) => {
//     try {
//         const today = new Date();
//         const overdue = await LendingModel.find({
//             dueDate: { $lt: today },
//             isReturned: false,
//         }).populate('reader').populate('book');
//
//         res.json(overdue);
//     } catch (error) {
//         next(error);
//         // res.status(500).json({ error: 'Failed to fetch overdue books' });
//     }
// };
