import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import moment from 'moment';

// import moment from 'moment';
import { Op } from 'sequelize';
import pool from 'utils/db';

import authUserMiddleware from '../../../middlewares/authUserMiddleware';
import onlySuppliersMiddleware from '../../../middlewares/onlySuppliersMiddleware';
import { withErrorHandler } from '../../../middlewares/withErrorHandler';
import {
  Proposal,
  ProposalTenderProduct,
  ProposalTenderProducts,
  Tender,
} from '../../../sequelize/models';

// const createProposal = async (
//   Tender_ID: number,
//   Supplier_ID: number,
//   Description: string,
//   Offer: any,
// ) =>
//   pool.query(
//     `INSERT INTO "Proposal" ("Tender_ID", "Supplier_ID", "Description", "Offer", "CreatedAt")
//      VALUES ('${Tender_ID}', '${Supplier_ID}', '${Description}', ${Offer}, '${moment().format(
//       'YYYY-MM-DD',
//     )}')
//      RETURNING "ID"`,
//   );

const createProposalAttachment = async (ID: number, URL: string) =>
  pool.query(
    `INSERT INTO "ProposalAttachment" ("Proposal_ID", "URL")
   VALUES ('${ID}', '${URL}') RETURNING "ID"`,
  );

const handler = nextConnect()
  .use(authUserMiddleware())
  .use(onlySuppliersMiddleware())
  .post(
    withErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
      const { ProposalAttachments, TenderProducts, ...restProps } = req.body;

      const proposal = await Proposal.create(restProps, {
        include: [
          {
            association: ProposalTenderProducts,
            as: 'categories',
          },
        ],
      });
      if (ProposalAttachments !== undefined && ProposalAttachments.length > 0) {
        try {
          await Promise.all(
            ProposalAttachments.map(async (attachment: any) => {
              return createProposalAttachment(proposal.ID, attachment.URL);
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

      if (TenderProducts !== undefined && TenderProducts.length > 0) {
        try {
          const { dataValues: tender } = await Tender.findByPk(
            restProps.Tender_ID,
            {
              where: { ClosingAt: { [Op.gt]: moment.utc() } },
              attributes: { exclude: ['ID'] },
            },
          );

          await ProposalTenderProduct.bulkCreate(
            TenderProducts.map((TenderProduct: any) => ({
              ClosingAt: tender.ClosingAt,
              Offer: TenderProduct.Offer,
              TenderProduct_ID: TenderProduct.TenderProduct_ID,
              Proposal_ID: proposal.ID,
              ...tender,
            })),
          );
        } catch (err) {
          return res.status(400).json({
            success: false,
            message: 'something wrong when creating ProposalTenderProduct',
            err,
          });
        }
      }

      return res.status(200).json({
        success: true,
        data: proposal,
      });
    }),
  );

export default handler;
