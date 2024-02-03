import nodemailer from 'nodemailer';

const emailConfg = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
}

const transporter = nodemailer.createTransport(emailConfg);

/**
 * Send an email
 * @param to Recipient's email address
 * @param subject Email subject
 * @param text Email text content
 * @param html Email HTML content (optional)
 */

export const sendEmail = async (to: string, subject: string, text: string, html?: string) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to,
      subject,
      text,
      html,
    });
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}