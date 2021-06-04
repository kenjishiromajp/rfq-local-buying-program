import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';

const onlySuppliersMiddleware = () => {
  return (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    if (!req.user?.Supplier_ID) {
      return res.status(401).json({ message: 'Not Authorized' });
    }
    return next();
  };
};
export default onlySuppliersMiddleware;
