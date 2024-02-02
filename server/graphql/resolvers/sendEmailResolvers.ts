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
          <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 20px;">
              <h1 style="font-weight: bold; color: #18181b;">Al Haya</h1>
            </div>
            <div style="border-bottom: 2px solid #007bff; margin-bottom: 20px; padding-bottom: 10px;">
              <h1 style="color: #18181b; text-align: center;">Welcome to Our Newsletter!</h1>
            </div>
            <p style="color: #18181b">Thank you for subscribing to our newsletter. You'll now receive the latest updates on our products and services directly to your inbox.</p><br>
            <p style="color: #18181b;">To ensure our emails always reach your inbox, please add our email address to your contacts.</p>
            <div style="text-align: center; margin-top: 20px;">
              <a href="https://al-haya.vercel.app/" target="_blank" rel="noopener noreferrer" style="display: inline-block; background-color: #18181b; color: #f4f4f5; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; align-items: center; justify-content: center;">Visit Our Website</a>
            </div>
            <footer style="margin-top: 30px; text-align: center;">
              <p style="color: #18181b">© Al Haya 2024, All rights reserved.</p>
            </footer>
          </div>
          <style>
            @media only screen and (max-width: 768px) {
              div {
                padding: 10px;
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
