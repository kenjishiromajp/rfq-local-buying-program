import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

export const withErrorHandler = (
  apiHandler: (
    req: NextApiRequest,
    res: NextApiResponse,
    next?: NextApiHandler,
  ) => Promise<void>,
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      return await apiHandler(req, res);
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
  };
};
