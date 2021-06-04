import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import bcrypt from 'bcrypt';
import moment from 'moment';
import pool from 'utils/db';

import { Supplier, SupplierHasOneUSer } from '../../../sequelize/models';
import { createBuyer } from './user';

const checkEmailExist = async (Email: string) => {
  let result = null;
  result = await pool.query(
    `SELECT EXISTS (SELECT * FROM "User" WHERE "Email"='${Email}');`,
  );

  return result.rows[0].exists;
};

const handler = nextConnect().post(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const {
      Type,
      Password,
      Name,
      Email,
      ABN,
      Logo,
      SupplyCategories,
    } = req.body;
    let exists = null;
    try {
      exists = await checkEmailExist(Email);
    } catch (err) {
      return res.status(500).json({ err });
    }

    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: 'Email is already taken!' });
    }

    const hashedPassword = bcrypt.hashSync(Password as string, 10);
    if (Type === 'supplier') {
      const { State_ID, City_ID } = req.body;
      const supplier = await Supplier.create(
        {
          Name,
          ABN,
          Logo,
          State_ID,
          City_ID,
          User: {
            Name,
            Password: hashedPassword,
            Email,
          },
        },
        {
          include: [
            {
              association: SupplierHasOneUSer,
              as: 'User',
            },
          ],
        },
      );
      if ((SupplyCategories || [])?.length) {
        await supplier.addSupplyCategories(SupplyCategories);
      }
      // supplier.addSupplyCategory
      return res.status(200).json({ success: true, data: supplier });
      // let SupplierID = null;
      // try {
      //   SupplierID = await createSupplier(Name, ABN, Logo, State_ID, City_ID);
      // } catch (err) {
      //   return res.status(500).json({ message: 'Something wrong' });
      // }
      //
      // try {
      //   const result = await pool.query(
      //     `INSERT INTO "User" ("Name", "Password", "Email", "Supplier_ID", "CreatedAt") VALUES ('${Name}', '${hashedPassword}', '${Email}', '${SupplierID}', '${moment().format(
      //       'YYYY-MM-DD',
      //     )}');`,
      //   );
      //   if (result) res.status(200).json({ success: true });
      // } catch (err) {
      //   return res.status(500).json({ err });
      // }
    }
    if (Type === 'buyer') {
      let BuyerID = null;
      try {
        BuyerID = await createBuyer(Name, ABN, Logo);
      } catch (err) {
        console.error(err);
        return res
          .status(500)
          .json({ success: false, message: 'Cannot create Buyer' });
      }

      try {
        const result = await pool.query(
          `INSERT INTO "User" ("Name", "Password", "Email", "Buyer_ID", "CreatedAt") VALUES ('${Name}', '${hashedPassword}', '${Email}', '${BuyerID}', '${moment().format(
            'YYYY-MM-DD',
          )}');`,
        );
        if (result) return res.status(200).json({ succes: true });
      } catch (err) {
        return res
          .status(500)
          .json({ success: false, message: 'Cannot create user' });
      }
    } else if (Type === 'user') {
      try {
        const result = await pool.query(
          `INSERT INTO "User" ("Name", "Password", "Email", "CreatedAt") VALUES ('${Name}', '${hashedPassword}', '${Email}', '${moment().format(
            'YYYY-MM-DD',
          )}');`,
        );
        if (result) return res.status(200).json({ succes: true });
      } catch (err) {
        return res
          .status(500)
          .json({ success: false, message: 'Cannot create user' });
      }
    }
    return res.status(500).json({ message: 'something resally wrong' });
  },
);

export default handler;
