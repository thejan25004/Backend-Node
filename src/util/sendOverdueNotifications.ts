import {ReaderModel} from "../models/Reader";
import {LendingModel} from "../models/Lending";
import {IBook} from "../models/Book";
import sendEmail from "./email";

export const sendOverdueNotifications = async () => {
    try {
        const readers = await ReaderModel.find();

        for (const reader of readers) {
            const overdueBooks = await LendingModel.find({
                reader: reader._id,
                isReturned: false,
                dueDate: { $lt: new Date() }
            }).populate<{ book: IBook }>('book');

            if (overdueBooks.length === 0) continue;

            const bookList = overdueBooks
                .map(l => `- ${l.book.title} (Due: ${l.dueDate.toDateString()})`)
                .join('\n');

            const emailBody = `Dear ${reader.fullName},\n\nYou have overdue books:\n${bookList}\n\nPlease return them ASAP.\n\nThank you.`;

            await sendEmail(reader.email, '📚 Overdue Book Notification', emailBody);
            console.log(`📧 Sent overdue email to ${reader.fullName}`);
        }
    } catch (err) {
        console.error('❌ Failed to send overdue emails:', err);
    }
};
