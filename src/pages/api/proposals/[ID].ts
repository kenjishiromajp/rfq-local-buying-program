import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import pool from 'utils/db';

const getProposalByID = async (ID: number) =>
  pool.query(`SELECT * FROM "Proposal" WHERE "ID"=$1`, [ID]);

const handler = nextConnect().get(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { ID } = req.query;
    try {
      const result = await getProposalByID(ID);
      if (result.rowCount > 0) {
        return res.status(200).json({ success: true, data: result.rows[0] });
      }
      return res
        .status(400)
        .json({ success: false, message: 'Tender not exist' });
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, message: 'Something wrong with Tender', err });
    }
  },
);

export default handler;
