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
          <div style="border-bottom: 2px solid #007bff; margin-bottom: 20px; padding-bottom: 10px;">
            <h1 style="color: #007bff;">Welcome to Our Newsletter!</h1>
          </div>
          <p>Thank you for subscribing to our newsletter. You'll now receive the latest updates on our products and services directly to your inbox.</p>
          <p>To ensure our emails always reach your inbox, please add our email address to your contacts.</p>
          <div style="margin-top: 20px; padding: 10px; background-color: #f8f9fa; border-left: 4px solid #007bff;">
            <p><strong>Tips:</strong> Check out our <a href="https://al-haya.vercel.app/" target="_blank" rel=""noopener>website<a/> for more information and follow us on our social media channels.</p>
          </div>
          <footer style="margin-top: 30px; text-align: center;">
            <p>© Al Haya 2024, All rights reserved.</p>
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
