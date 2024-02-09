import crypto from 'crypto';

// Generate a random token 
export const generateToken = () => {
  return crypto.randomBytes(32).toString('hex');
};
