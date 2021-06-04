import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import pool from 'utils/db';

const handler = nextConnect().post(
  (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.body;

    pool
      .query(
        `UPDATE public.user
            SET token=NULL, refresh_token=NULL
            WHERE ID=$1`,
        [id],
      )
      .then(() => {
        return res.status(200).json({ success: true });
      })
      .catch((err: any) => {
        return res.status(500).json(err);
      });
  },
);

export default handler;
