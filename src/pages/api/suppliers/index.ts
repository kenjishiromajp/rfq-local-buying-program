import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import authUserMiddleware from '../../../middlewares/authUserMiddleware';
import { Supplier } from '../../../sequelize/models';

const handler = nextConnect()
  .use(authUserMiddleware())
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const suppliers = await Supplier.findAll({
        include: [{ all: true, nested: true }],
        order: [['CreatedAt', 'DESC']],
      });

      return res.status(200).json({
        success: true,
        items: suppliers,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Something wrong with Tenders',
        err,
      });
    }
  });

export default handler;
