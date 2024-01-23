import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Define the document schema
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
});

// Hash the password before saving the user model
userSchema.pre('save', async function (next) {
  const user = this as any;
  if (!user.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

// Compare the password sent by the user during login
userSchema.methods.comparePassword = async function (password: string) {
  const user = this as any;
  return await bcrypt.compare(password, user.password);
};

// Create the user model
const User = mongoose.model('User', userSchema);

export default User;