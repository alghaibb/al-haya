import crypto from 'crypto';

export const generateVerificationToken = (): { token: string, expires: Date } => {
  const token = crypto.randomBytes(20).toString('hex');
  const expires = new Date(Date.now() + 3600000);
  return { token, expires };
};