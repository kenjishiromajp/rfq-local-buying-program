import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { withErrorHandler } from '../../../middlewares/withErrorHandler';
import { Proposal } from '../../../sequelize/models';

const handler = nextConnect().get(
  withErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
    const { ID } = req.query;
    const proposal = await Proposal.findByPk(ID, {
      include: [{ all: true, nested: true }],
    });
    return res.status(200).json({ success: true, data: proposal });
  }),
);

export default handler;
