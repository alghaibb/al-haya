import mongoose from 'mongoose';

export interface IContactMessage {
  user: mongoose.Schema.Types.ObjectId;
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

const contactMessageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);

export default ContactMessage;