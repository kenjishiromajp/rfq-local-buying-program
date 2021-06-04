import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import pool from 'utils/db';

import authUserMiddleware from '../../middlewares/authUserMiddleware';

const getUserSupplierData = async (ID: number) =>
  pool.query(
    `SELECT "User"."ID" , "User"."Name", "User"."Email", "User"."Supplier_ID", "User"."CreatedAt", "Supplier"."ABN",  "Supplier"."Logo",  "Supplier"."State_ID",  "Supplier"."City_ID"  FROM "User", "Supplier" WHERE "User"."Supplier_ID"="Supplier"."ID" AND "Supplier"."ID"=${ID};`,
  );

const getUserBuyerData = async (ID: number) =>
  pool.query(
    `SELECT "User"."ID"AS "ID", "User"."Name", "User"."Email", "User"."Supplier_ID", "User"."CreatedAt", "Buyer"."ABN",  "Buyer"."Logo" FROM "User", "Buyer" WHERE  "User"."Buyer_ID"="Buyer"."ID" AND"Buyer"."ID"=${ID};`,
  );

const getCity = async (ID: number) =>
  pool.query(`SELECT "ID","Name" FROM "City" WHERE "ID"=${ID}`);

const getState = async (ID: number) =>
  pool.query(`SELECT "ID","Name", "Acronym" FROM "State" WHERE "ID"=${ID}`);

const handler = nextConnect()
  .use(authUserMiddleware())
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const Supplier_ID = req.user?.Supplier_ID;
    const Buyer_ID = req.user?.Buyer_ID;
    let result = null;
    try {
      if (Supplier_ID) result = await getUserSupplierData(Supplier_ID);
      else if (Buyer_ID) result = await getUserBuyerData(Buyer_ID);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'something wrong when getting User data',
      });
    }
    if (result.rowCount > 0) {
      result = result.rows[0];
      if (Supplier_ID) {
        let city = null;
        let state = null;
        try {
          city = await getCity(result.City_ID);
          state = await getState(result.State_ID);
        } catch (err) {
          res.status(500).json({
            success: false,
            message: 'somthing wrong when getting state or city',
          });
        }
        result.city = city.rows[0];
        result.state = state.rows[0];
      }

      return res.status(200).json({ success: true, data: result });
    }
    return res.status(400).json({ success: false, message: 'user not exist' });
  });

export default handler;
