import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import pool from 'utils/db';

const handler = nextConnect().get(
  (req: NextApiRequest, res: NextApiResponse) => {
    pool
      .query(`SELECT * FROM "SupplyCategory"`)
      .then((result: any) => {
        return res.status(200).json({ success: true, items: result.rows });
      })
      .catch((err: any) => {
        return res.status(500).json({
          success: false,
          message: 'Something wrong when getting Supply Categories',
          err,
        });
      });
  },
);

export default handler;
