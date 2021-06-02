import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import pool from 'utils/db';

import authUserMiddleware from '../../../middlewares/authUserMiddleware';

const handler = nextConnect()
  .use(authUserMiddleware())
  .get((req: NextApiRequest, res: NextApiResponse) => {
    pool
      .query(`SELECT * FROM "Tender" WHERE "Buyer_ID" = $1`, [
        req.user?.Buyer_ID,
      ])
      .then((result: any) => {
        if (result.rowCount > 0)
          return res.status(200).json({ success: true, items: result.rows });
        return res.status(500).json({
          success: false,
          message: 'Something wrong when getting Tenders',
        });
      })
      .catch((err: any) => {
        return res.status(500).json({
          success: false,
          message: 'Something wrong with Tenders',
          err,
        });
      });
  });

export default handler;
