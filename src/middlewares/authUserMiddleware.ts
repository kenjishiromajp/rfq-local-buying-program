import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';

import jwt from 'jsonwebtoken';

import { IUser } from 'models/IUser';

const authUserMiddleware = () => {
  return (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    try {
      const token = (req.headers.authorization || '')
        .replace('Bearer', '')
        .trim();
      if (token) {
        req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
          ? (jwt.decode(token) as IUser)
          : undefined;
      }
    } catch (error) {
      console.error(error);
    }
    next();
  };
};
export default authUserMiddleware;
