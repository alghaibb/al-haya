import nodemailer from 'nodemailer';

const sendEmailResolvers = {
  Mutation: {
    Mutation: {
      // your existing mutation resolvers
      subscribe: async (_: any, { email }: { email: string }) => {
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
          text: 'Thank you for subscribing to our newsletter!',
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
  },
};

export default sendEmailResolvers;
