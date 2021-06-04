// The value I used and add in .env file
// ACCESS_TOKEN_SECRET=d4bbdad0d47cf552c0d669941097eb02
// REFRESH_TOKEN_SECRET=d251a84f3d83e51f68db56bea902f295
import jwt from 'jsonwebtoken';

const generateTokens = (user: any) => {
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET || '', {
    expiresIn: 86400,
  });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET || '');

  return { accessToken, refreshToken };
};
export default generateTokens;
