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
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 768px; margin: auto; border: 1px solid #ddd; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://drive.google.com/file/d/1JPtO8RvRRHCCv40xcCdWWSQi1mKaqc1y/view?usp=sharing" alt="Al Haya Logo" style="max-width: 100px;">
          </div>
          <div style="border-bottom: 2px solid #007bff; margin-bottom: 20px; padding-bottom: 10px;">
            <h1 style="color: #007bff;">Welcome to Our Newsletter!</h1>
          </div>
          <p>Thank you for subscribing to our newsletter. You'll now receive the latest updates on our products and services directly to your inbox.</p>
          <p>To ensure our emails always reach your inbox, please add our email address to your contacts.</p>
          <div style="text-align: center; margin-top: 30px;">
            <a href="https://al-haya.vercel.app/" target="_blank" rel="noopener noreferrer" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Visit Our Website</a>
          </div>
          <footer style="margin-top: 30px; text-align: center;">
            <p>© Al Haya 2024, All rights reserved.</p>
          </footer>
        </div>
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
