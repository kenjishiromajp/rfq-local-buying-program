import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import pool from 'utils/db';

const handler = nextConnect().get(
  (req: NextApiRequest, res: NextApiResponse) => {
    const { ID } = req.query;
    pool
      .query(`SELECT * FROM "Buyer" WHERE "ID"=${ID}`)
      .then((result: any) => {
        return res.status(200).json({ success: true, data: result.rows[0] });
      })
      .catch((err: any) => {
        return res.status(500).json({
          success: false,
          message: 'Something wrong when getting Buyer',
          err,
        });
      });
  },
);

export default handler;
