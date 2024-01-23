import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';

interface TokenPayload {
  _id: string;
  email: string;
  fullName: string;
}

const expiration = '7d';

export const AuthenticationError = new GraphQLError('Could not authenticate user.', {
  extensions: {
    code: 'UNAUTHENTICATED',
  },
});

export const authMiddleware = ({ req }: { req: any }) => {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    return req;
  }

  try {
    const { data } = jwt.verify(token, process.env.JWT_SECRET as string, { maxAge: expiration }) as { data: TokenPayload };
    req.user = data;
  } catch (error) {
    console.error(error);
  }

  return req;
}

export const signToken = (payload: TokenPayload) => {
  if (!process.env.JWT_SECRET) {
    console.error('JWT Secret is not provided in environment variables.');
    throw new Error('JWT Secret not provided');
  }
  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: expiration });
};
