// import { Request, Response, NextFunction } from 'express';
// import { ReaderModel } from '../models/Reader';
// import { LendingModel } from '../models/Lending';
// import { IBook } from '../models/Book';
// import sendEmail from "../util/email";
// import {APIError} from "../errors/ApiError";
//
// export const sendOverdueEmail = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { readerId } = req.body;
//
//         const reader = await ReaderModel.findById(readerId);
//         const overdueBooks = await LendingModel.find({
//             reader: readerId,
//             isReturned: false,
//             dueDate: { $lt: new Date() }
//         }).populate<{ book: IBook }>('book'); // 👈 tell TS this is a populated book
//
//         if (!reader || overdueBooks.length === 0) {
//             throw new APIError(404, 'No overdue books or reader not found');
//         }
//
//         const bookList = overdueBooks
//             .map(l => `- ${l.book.title} (Due: ${l.dueDate.toDateString()})`)
//             .join('\n');
//
//         const emailBody = `Dear ${reader.fullName},\n\nYou have overdue books:\n${bookList}\n\nPlease return them ASAP.\n\nThank you.`;
//
//         await sendEmail(reader.email, 'Overdue Book Notification', emailBody);
//
//         res.json({ message: 'Notification sent successfully' });
//     } catch (err) {
//         next(err);
//     }
// };
