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

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetPasswordUrl = `http://localhost:3000/reset-password/${token}`;

  await transporter.sendMail({
    from: `"Al Haya" ${process.env.MAIL_FROM_ADDRESS}`,
    to: email,
    subject: 'Reset Your Password',
    html: `
    <div style="font-family: Arial, sans-serif; color: #333; text-align: center;">
      <h2 style="color: #000;">Reset Your Password</h2>
      <p>We received a request to reset the password for your account. If you didn't make this request, you can safely ignore this email.</p>
      <p>To reset your password, click the button below:</p>
      <div style="margin: 20px 0;">
        <a href="${resetPasswordUrl}" style="background-color: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 50px; display: inline-block;">Reset Password</a>
      </div>
    </div>
   `
  });
};
