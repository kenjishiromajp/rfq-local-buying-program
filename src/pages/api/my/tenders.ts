import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import authUserMiddleware from '../../../middlewares/authUserMiddleware';
import { withErrorHandler } from '../../../middlewares/withErrorHandler';
import { Tender } from '../../../sequelize/models';

const handler = nextConnect()
  .use(authUserMiddleware())
  .get(
    withErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
      const tenders = await Tender.findAll({
        include: [{ all: true, nested: true }],
      });
      return res.status(200).json({
        success: false,
        items: tenders,
      });
    }),
  );

export default handler;
