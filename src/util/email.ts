// import nodemailer from 'nodemailer';
//
// const sendEmail = async (to: string, subject: string, text: string) => {
//     const transporter = nodemailer.createTransport({
//         service: 'Gmail', // or SendGrid SMTP
//         auth: {
//             user: process.env.EMAIL_USER,
//             pass: process.env.EMAIL_PASS,
//         }
//     });
//
//     await transporter.sendMail({
//         from: `"Book Club Library" <${process.env.EMAIL_USER}>`,
//         to,
//         subject,
//         text,
//     });
// };
//
// export default sendEmail;
