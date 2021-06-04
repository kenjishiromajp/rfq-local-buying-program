import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import authUserMiddleware from '../../../middlewares/authUserMiddleware';
import onlyBuyersMiddleware from '../../../middlewares/onlyBuyersMiddleware';
import { withErrorHandler } from '../../../middlewares/withErrorHandler';
import { Tender } from '../../../sequelize/models';

const handler = nextConnect()
  .use(authUserMiddleware())
  .use(onlyBuyersMiddleware())
  .get(
    withErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
      const tenders = await Tender.findAll({
        where: {
          Buyer_ID: req.user!.Buyer_ID,
        },
        include: [{ all: true, nested: true }],
      });
      return res.status(200).json({
        success: false,
        items: tenders,
      });
    }),
  );

export default handler;
