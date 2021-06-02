import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import pool from 'utils/db';

const handler = nextConnect().get(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { ID } = req.query;
    try {
      const {
        rows: [supplier],
      } = await pool.query(`SELECT * FROM "Supplier" WHERE "ID"=${ID}`);
      return res.status(200).json({ success: true, data: supplier });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Something wrong when getting Supplier',
        err,
      });
    }
  },
);

export default handler;
