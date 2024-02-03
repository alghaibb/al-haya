import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
  debug: true,
  logger: true,
});

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationUrl = `http://localhost:3000/verify/${token}`;
  await transporter.sendMail({
    from: `"Al Haya" ${process.env.MAIL_FROM_ADDRESS}`,
    to: email,
    subject: 'Please verify your email',
    html: `Click <a href="${verificationUrl}">here</a> to verify your email.`,
  });
};