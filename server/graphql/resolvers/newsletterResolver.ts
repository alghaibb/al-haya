import nodemailer from 'nodemailer';

const sendEmailResolvers = {
  Mutation: {
    // your existing mutation resolvers
    subscribeToNewsletter: async (_: any, { email }: { email: string }) => {
      // Set up transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail', // or your email service
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      // Set up email options
      const mailOptions = {
        from: process.env.MAIL_FROM_ADDRESS,
        to: email,
        subject: 'Subscription Confirmation',
        html: `
          <div style="font-family: Arial, sans-serif; color: #F4F4F5; background-color: #18181B; max-width: 600px; margin: auto; border: 1px solid #2D2D2D; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <div style="border-bottom: 2px solid #007bff; margin-bottom: 20px; padding-bottom: 10px; text-align: center;">
              <h1 style="color: #007bff; font-size: 28px;">Al Haya</h1>
            </div>
            <p style="font-size: 16px; line-height: 1.5;">Thank you for subscribing to our newsletter. You'll now receive the latest updates on our products and services directly to your inbox.</p>
            <p style="font-size: 16px; line-height: 1.5;">To ensure our emails always reach your inbox, please add our email address to your contacts.</p>
            <div style="margin-top: 20px; text-align: center;">
              <a href="https://al-haya-73td.vercel.app/" style="display: inline-block; background-color: #007bff; color: #F4F4F5; padding: 10px 20px; border-radius: 20px; text-decoration: none; font-weight: bold; font-size: 16px;">Back to Al Haya</a>
            </div>
            <footer style="margin-top: 30px; text-align: center;">
              <p style="font-size: 14px;">© Al Haya, All rights reserved.</p>
            </footer>
          </div>
          <style>
            @media only screen and (max-width: 600px) {
              div {
                padding: 10px;
              }
              h1 {
                font-size: 20px;
              }
              p, a {
                font-size: 14px;
              }
            }
          </style>
        `,
      };

      // Send email
      try {
        await transporter.sendMail(mailOptions);
        return 'Subscription successful! Please check your email for confirmation.';
      } catch (error) {
        console.error('Error sending subscription email:', error);
        throw new Error('Failed to subscribe to the newsletter.');
      }
    },
  },
};

export default sendEmailResolvers;
