import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { City } from '../../sequelize/models';

const handler = nextConnect().get(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const cities = await City.findAll({
      include: [{ all: true, nested: true }],
    });
    return res.status(200).json({
      success: false,
      items: cities,
    });
  },
);

export default handler;
