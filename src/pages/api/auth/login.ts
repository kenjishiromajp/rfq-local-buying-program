import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import pool from 'utils/db';
import generateTokens from 'utils/generateTokens';

const bcrypt = require('bcrypt');

const storeTokens = (
  res: NextApiResponse,
  accessToken: string,
  refreshToken: string,
  ID: number,
) =>
  pool
    .query('UPDATE "User" SET "Token"=$1, "RefreshToken"=$2 WHERE "ID"=$3', [
      accessToken,
      refreshToken,
      ID,
    ])
    .catch((err: any) => {
      return err;
    });

const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onNoMatch(req, res) {
    res.status(405).json({
      error: `Method ${req.method} Not Found or Not Allowed`,
    });
  },
}).post((req, res) => {
  const { Email, Password } = req.body;

  pool
    .query(
      `SELECT "ID", "Name", "Password", "Email", "Buyer_ID", "Supplier_ID" FROM "User" WHERE "User"."Email"=$1`,
      [Email],
    )
    .then((result: any) => {
      if (result.rowCount > 0) {
        const { ID, Name, Supplier_ID, Buyer_ID } = result.rows[0];
        const hashedPassword = result.rows[0].Password;
        if (bcrypt.compareSync(Password, hashedPassword)) {
          const { accessToken, refreshToken } = generateTokens({
            ID,
            Email,
            Name,
            Supplier_ID,
            Buyer_ID,
          });

          storeTokens(res, accessToken, refreshToken, ID);
          res
            .status(200)
            .send({ success: true, tokens: { accessToken, refreshToken }, ID });
        } else
          res
            .status(400)
            .json({ success: false, message: 'Something Incorrect' });
      } else
        res.status(400).json({ success: false, message: 'email not found' });
    })
    .catch((err: any) => {
      if (err) res.status(500).json(err);
    });
});

export default handler;
