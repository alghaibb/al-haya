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
  const verificationUrl = `https://al-haya-73td.vercel.app/verify/${token}`;

  await transporter.sendMail({
    from: `"Al Haya" ${process.env.MAIL_FROM_ADDRESS}`,
    to: email,
    subject: 'Please verify your email',
    html: `
    <div style="font-family: Arial, sans-serif; color: #333; text-align: center;">
      <h2 style="color: #000;">Verify Your Email Address</h2>
      <p>Thank you for registering with us. To complete the sign-up process, please verify your email address by clicking the link below.</p>
      <div style="margin: 20px 0;">
        <a href="${verificationUrl}" style="background-color: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 50px; display: inline-block;">Verify Email</a>
      </div>
      <p style="margin-top: 30px; font-size: 0.9em;">If you did not create an account using this email address, please ignore this email.</p>
    </div>
   `
  });
};