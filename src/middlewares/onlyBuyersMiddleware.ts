import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';

const onlyBuyersMiddleware = () => {
  return (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    if (!req.user?.Buyer_ID) {
      return res.status(401).json({ message: 'Not Authorized' });
    }
    return next();
  };
};
export default onlyBuyersMiddleware;
