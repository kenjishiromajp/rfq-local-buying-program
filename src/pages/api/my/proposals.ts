import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import moment from 'moment';
import pool from 'utils/db';

import authUserMiddleware from '../../../middlewares/authUserMiddleware';

const createProposal = async (
  Tender_ID: number,
  Supplier_ID: number,
  Description: string,
  Offer: any,
) =>
  pool.query(
    `INSERT INTO "Proposal" ("Tender_ID", "Supplier_ID", "Description", "Offer", "CreatedAt")
     VALUES ('${Tender_ID}', '${Supplier_ID}', '${Description}', ${Offer}, '${moment().format(
      'YYYY-MM-DD',
    )}')
     RETURNING "ID"`,
  );

const createProposalAttachment = async (ID: number, URL: string) =>
  pool.query(
    `INSERT INTO "ProposalAttachment" ("Proposal_ID", "URL")
   VALUES ('${ID}', '${URL}') RETURNING "ID"`,
  );

const handler = nextConnect()
  .use(authUserMiddleware())
  .get((req: NextApiRequest, res: NextApiResponse) => {
    pool
      .query(`SELECT * FROM "Proposal" WHERE "Supplier_ID" = $1`, [
        req.user?.Supplier_ID,
      ])
      .then((result: any) => {
        if (result.rowCount > 0)
          return res.status(200).json({ success: true, items: result.rows });
        return res.status(400).json({
          succes: false,
          message: 'Something wrong when getting Proposal',
        });
      })
      .catch((err: any) => {
        return res.status(500).json({
          success: false,
          message: 'Something wrong with Proposal',
          err,
        });
      });
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { Description, Offer, Tender_ID } = req.body;
    const Supplier_ID = req.user?.Supplier_ID;
    let result = null;
    try {
      if (!Supplier_ID) {
        throw new Error('Only Supplier can add a proposal!');
      }
      result = await createProposal(Tender_ID, Supplier_ID, Description, Offer);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Something wrong when creating Proposal',
        err,
      });
    }

    const ProposalID = result.rows[0].ID;
    const { ProposalAttachment: ProposalAttachments } = req.body;

    if (ProposalAttachments !== undefined && ProposalAttachments.length > 0) {
      try {
        await Promise.all(
          ProposalAttachments.map(async (attachment: any) => {
            return createProposalAttachment(ProposalID, attachment.URL);
          }),
        );
      } catch (err) {
        return res.status(500).json({
          success: false,
          message: 'Something wrong when creating attachment',
          err,
        });
      }
    }

    return res.status(200).json({
      success: true,
      data: {
        ...req.body,
        ID: ProposalID,
      },
    });
  });

export default handler;
