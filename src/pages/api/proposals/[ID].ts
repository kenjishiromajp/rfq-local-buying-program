import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import pool from 'utils/db';

const getProposalByID = async (ID: number) =>
  pool.query(`SELECT * FROM "Proposal" WHERE "ID"=$1`, [ID]);

const getSupplierByID = async (ID: number) =>
  pool.query(`SELECT * FROM "Supplier" WHERE "ID"=${ID}`);

const getTenderByID = async (ID: number) =>
  pool.query(`SELECT * FROM "Tender" WHERE "ID"=${ID}`);

const handler = nextConnect().get(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { ID } = req.query;
    try {
      const {
        rows: [proposal],
      } = await getProposalByID(parseInt((ID || '0').toString(), 10));
      const [
        {
          rows: [Supplier],
        },
        {
          rows: [Tender],
        },
      ] = await Promise.all([
        getSupplierByID(proposal.Supplier_ID),
        getTenderByID(proposal.Tender_ID),
      ]);
      return res
        .status(200)
        .json({ success: true, data: { ...proposal, Supplier, Tender } });
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, message: 'Something wrong with Tender', err });
    }
  },
);

export default handler;
