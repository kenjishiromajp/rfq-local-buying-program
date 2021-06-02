import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { State } from '../../sequelize/models';

const handler = nextConnect().get(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const states = await State.findAll({
      include: [{ all: true, nested: true }],
    });
    return res.status(200).json({
      success: false,
      items: states,
    });
  },
);

export default handler;
