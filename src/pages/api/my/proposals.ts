import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

// import moment from 'moment';
// import { Op } from 'sequelize';

import authUserMiddleware from '../../../middlewares/authUserMiddleware';
import onlySuppliersMiddleware from '../../../middlewares/onlySuppliersMiddleware';
import { withErrorHandler } from '../../../middlewares/withErrorHandler';
import { Proposal } from '../../../sequelize/models';

const handler = nextConnect()
  .use(authUserMiddleware())
  .use(onlySuppliersMiddleware())
  .get(
    withErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
      const proposals = await Proposal.findAll({
        where: {
          Supplier_ID: req.user!.Supplier_ID,
        },
        include: [{ all: true, nested: true }],
      });
      return res.status(200).json({
        success: false,
        items: proposals,
      });
    }),
  );

export default handler;
