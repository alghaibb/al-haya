import crypto from 'crypto';

// Generate a random token and set it to expire in 10 minutes 
export const generateToken = () => {
  return crypto.randomBytes(32).toString('hex');
};
