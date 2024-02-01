import ContactMessage, { IContactMessage } from "../../models/ContactMessage";
import { authMiddleware, AuthenticationError } from "../../utils/auth";

const contactResolvers = {
  Mutation: {
    sendContactMessage: async (_: any, { contactInput }: { contactInput: IContactMessage }, context: any) => {
      // Call the authMiddleware to authenticate the user
      const authContext = authMiddleware(context);

      // If the user is not authenticated, throw an error
      if (!authContext || !authContext.user) {
        throw AuthenticationError;
      }

      // Proceed with the authenticated user's information
      const userId = context.user._id;

      try {
        const newMessage = new ContactMessage({
          ...contactInput,
          user: userId,
        });
        await newMessage.save();

        return {
          success: true,
          message: 'Your message has been sent successfully.',
        };
      } catch (error) {
        console.error(error);
        throw new Error('Error processing contact message.');
      }
    },
  },
};

export default contactResolvers;
