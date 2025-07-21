// import {NextFunction, Request, Response} from 'express';
// import { BookModel } from '../models/Book';
// import {APIError} from "../errors/ApiError";
//
// export const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const books = await BookModel.find();
//         res.json(books);
//     } catch (error) {
//         next(error);
//         // res.status(500).json({ error: 'Failed to fetch books' });
//     }
// };
//
// export const createBook = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const book = new BookModel(req.body);
//         await book.save();
//         res.status(201).json(book);
//     } catch (error) {
//         next(error);
//         // res.status(400).json({ error: 'Failed to create book' });
//     }
// };
//
// export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const updated = await BookModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updated) throw new APIError(404, 'Book not found');
//         res.json(updated);
//     } catch (error) {
//         next(error);
//         // res.status(400).json({ error: 'Failed to update book' });
//     }
// };
//
// export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const deleted = await BookModel.findByIdAndDelete(req.params.id);
//         if (!deleted) throw new APIError(404, 'Book not found');
//         res.json({ message: 'Book deleted' });
//     } catch (error) {
//         next(error);
//         // res.status(500).json({ error: 'Failed to delete book' });
//     }
// };
