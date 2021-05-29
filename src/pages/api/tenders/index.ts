import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import moment from 'moment';
import pool from 'utils/db';

import authUserMiddleware from '../../../middlewares/authUserMiddleware';

const createTender = async (
  Buyer_ID: number,
  Description: string,
  Title: string,
  HeadingImage: string,
  State_ID: number,
  City_ID: number,
  Offer: number,
  ClosingAt: Date,
) =>
  pool.query(
    `INSERT INTO "Tender" ("Buyer_ID", "ClosingAt", "Description", "State_ID", "City_ID", "Title", "HeadingImage", "Offer", "CreatedAt", "PublishedAt")
      VALUES ('${Buyer_ID}', '${ClosingAt}', '${Description}', '${State_ID}', '${City_ID}', '${Title}', '${HeadingImage}', '${Offer}', '${moment().format(
      'YYYY-MM-DD',
    )}', '${moment().format('YYYY-MM-DD')}')
      RETURNING "ID";`,
  );

const createTenderAttachment = async (ID: number, URL: string) =>
  pool.query(
    `INSERT INTO "TenderAttachment" ("Tender_ID", "URL")
   VALUES ('${ID}', '${URL}')
   RETURNING "ID";
   `,
  );

const handler = nextConnect()
  .use(authUserMiddleware())
  .get((req: NextApiRequest, res: NextApiResponse) => {
    pool
      .query(`SELECT * FROM "Tender"`)
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
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const {
      Description,
      Title,
      State_ID,
      City_ID,
      Offer,
      ClosingAt,
    } = req.body;
    const Buyer_ID = req.user?.Buyer_ID;
    const { HeadingImage } = req.body || '';
    let tenderResult = null;
    try {
      if (!Buyer_ID) {
        throw new Error('The User must be an Buyer!');
      }
      tenderResult = await createTender(
        Buyer_ID,
        Description,
        Title,
        HeadingImage,
        State_ID,
        City_ID,
        Offer,
        ClosingAt,
      );
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Something wrong when creating tender',
        err,
      });
    }

    const { TenderAttachment: TenderAttachments } = req.body;
    const TenderID = tenderResult.rows[0].ID;

    if (TenderAttachments !== undefined && TenderAttachments.length > 0) {
      try {
        await Promise.all(
          TenderAttachments.map(async (attachment: any) => {
            return createTenderAttachment(TenderID, attachment.URL);
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
        ID: TenderID,
      },
    });
  });

export default handler;
