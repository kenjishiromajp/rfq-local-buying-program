import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import pool from 'utils/db';

const handler = nextConnect().get(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { ID } = req.query;
    try {
      const {
        rows: [buyer],
      } = await pool.query(`SELECT * FROM "Buyer" WHERE "ID"=${ID}`);
      return res.status(200).json({ success: true, data: buyer });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Something wrong when getting Buyer',
        error,
      });
    }
  },
);

export default handler;
