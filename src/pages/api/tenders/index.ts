import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import moment from 'moment';
import { Op } from 'sequelize';

import authUserMiddleware from '../../../middlewares/authUserMiddleware';
import { withErrorHandler } from '../../../middlewares/withErrorHandler';
import { Tender, TenderAttachment } from '../../../sequelize/models';

const handler = nextConnect()
  .use(authUserMiddleware())
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const tenders = await Tender.findAll({
        where: {
          ClosingAt: { [Op.gt]: moment.utc() },
        },
        include: [{ all: true, nested: true }],
      });

      return res.status(200).json({
        success: true,
        items: tenders,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Something wrong with Tenders',
        err,
      });
    }
  })
  .post(
    withErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
      // const tender = await Tender.create({
      //   Title: 'wdasdasdsd',
      //   ClosingAt: new Date('2026-03-04'),
      //   Description:
      //     '<h1>asdsadasdasdfsadfjdshafjksa</h1>\n' +
      //     '<p>as</p>\n<p>dsdasdasdsjjskdajadls</p>',
      //   City_ID: 1,
      //   State_ID: 1,
      // });

      const {
        TenderAttachments,
        ClosingAt,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        SupplyCategories,
        ...restProps
      } = req.body;
      const Buyer_ID = req.user?.Buyer_ID;
      if (!Buyer_ID) {
        throw new Error('Just Buyers can create Tenders!');
      }
      const tender = await Tender.create({
        ...restProps,
        ClosingAt: new Date(ClosingAt),
        Buyer_ID,
      });

      if (TenderAttachments !== undefined && TenderAttachments?.length > 0) {
        await Promise.all(
          TenderAttachments.map(async (attachment: any) => {
            return TenderAttachment.create({
              ...attachment,
              Tender_ID: tender.ID,
            });
          }),
        );
      }

      return res.status(200).json({
        success: true,
        data: tender,
      });
    }),
  );

export default handler;
