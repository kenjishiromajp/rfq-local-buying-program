import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import jwt from 'jsonwebtoken';
import generateTokens from 'utils/generateTokens';

import { IUser } from 'models/IUser';

const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onNoMatch(req, res) {
    res.status(405).json({
      error: `Method ${req.method} Not Found or Not Allowed`,
    });
  },
}).get((req, res) => {
  const token = (req.headers.authorization || '').replace('Bearer', '').trim();
  if (token) {
    if (!jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)) {
      res.status(400).json({ message: 'token invalid' });
    }
    const user = jwt.decode(token) as IUser;
    const { accessToken, refreshToken } = generateTokens(user);
    res
      .status(200)
      .json({ success: true, tokens: { accessToken, refreshToken } });
  }
});

export default handler;
