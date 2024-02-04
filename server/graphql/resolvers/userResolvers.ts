import User from '../../models/User';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

import { signToken } from '../../utils/auth';
import { validateEmail, validateFullName, validatePasswordOnLogin, validatePasswordOnSignup } from '../../utils/userValidators';

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

const userResolvers = {
  Query: {
    getUsers: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('An error occurred while fetching users');
      }
    },

    getUserById: async (_: any, { id }: { id: string }) => {
      try {
        const user = await User.findById(id);
        return user;
      } catch (error) {
        console.error('Error fetching user by id:', error);
        if (error instanceof mongoose.Error.CastError) {
          throw new ValidationError('Invalid user ID format.');
        }
        throw new Error('An error occurred while fetching the user');
      }
    },
  },

  Mutation: {
    // Register a new user
    register: async (_: any, { registerInput }: { registerInput: any }) => {
      const { fullName, email, password, confirmPassword } = registerInput;

      // Validate full name, email and password
      if (!validateFullName(fullName)) {
        throw new Error('Invalid full name. Full name must be between 3 and 50 characters');
      }

      if (!validateEmail(email)) {
        throw new Error('Invalid email format');
      }

      if (!validatePasswordOnSignup(password)) {
        throw new Error('Invalid password. Password must be at least 8 characters long, including one letter, one number and one special character');
      }

      // Registration validation goes here
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      try {
        const user = new User({
          fullName,
          email,
          password,
        });

        await user.save();

        // Create a token using the signToken function
        const token = signToken({ _id: user._id.toString(), email: user.email, fullName: user.fullName });
        
        return { user, token };
      } catch (error: any) {
        console.error('Error registering user:', error);
        throw new Error(`Failed to register user: ${error.message}`);
      }
    },

    // Login a user
    login: async (_: any, { loginInput }: { loginInput: { email: string; password: string } }) => {
      const { email, password } = loginInput;

      // Login validation goes here
      if (!validateEmail(email)) {
        throw new Error('Invalid email');
      }

      if (!validatePasswordOnLogin(password)) {
        throw new Error('Password cannot be empty');
      }

      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error('User not found');
        }

        if (!user.password) {
          throw new Error('Invalid password');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

        // Create a token using the signToken function
        const token = signToken({ _id: user._id.toString(), email: user.email, fullName: user.fullName });

        return { user, token };
      } catch (error) {
        throw new Error('Failed to login user');
      }
    },

    // Logout a user
    logout: async (_: any, { token }: { token: String }) => {
      try {
        console.log(`User with token ${token} logged out successfully`);

        return 'User logged out successfully';
      } catch (error) {
        console.error('Error logging out user:', error);
        throw new Error('Failed to logout user');
      }
    },

    // Update a user
    updateUser: async (_: any, args: { _id: string; fullName?: string; password?: string }) => {
      try {
        const { _id, fullName, password } = args;
        const updateData: { fullName?: string; password?: string } = {};

        if (fullName) updateData.fullName = fullName;
        if (password) updateData.password = password;

        const user = await User.findByIdAndUpdate(_id, updateData, { new: true });

        if (!user) {
          throw new Error('User not found');
        }

        return user;
      } catch (error) {
        console.error('Error updating user:', error);
        throw new Error('Failed to update user');
      }
    },

    // Delete a user
    deleteUser: async (_: any, { _id }: { _id: string }) => {
      try {
        const deletedUser = await User.findByIdAndDelete(_id);

        if (!deletedUser) {
          console.error(`User with ID: ${_id} not found for deletion.`);
          throw new Error('User not found');
        }

        return 'User deleted successfully';
      } catch (error) {
        console.error('Error deleting user:', error);
        throw new Error('Failed to delete user');
      }
    }
  },
};

export default userResolvers;
