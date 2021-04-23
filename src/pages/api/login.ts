import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import executeQuery from '../../db/db';

const handler = nextConnect().post(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { userName, password } = req.body;
    let result = null;
    try {
      result = await executeQuery({
        query: `SELECT * from users`,
        values: [],
      });
    } catch (error) {
      res.json({ error });
    }

    const checkUserIdentification = result.map((data: any) => {
      if (data.Name === userName) {
        if (data.Password === password) {
          return true;
        }
      }
      return false;
    });

    return res.json({ authCheck: checkUserIdentification });
  },
);

export default handler;
