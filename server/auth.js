require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const pool = new Pool({
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
});
pool.connect();

// Generate access token
const generateAccessToken = user =>
  jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 86400 });

// generate refresh token
const generateRefreshToken = user =>
  jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET);

// Store tokens into into database for corresponding user
const storeTokens = (res, token, refreshToken, user) =>
  pool
    .query('UPDATE public.user SET token=$1, refresh_token=$2 WHERE Name=$3', [
      token,
      refreshToken,
      user,
    ])
    .catch(err => {
      res.status(500).send(err);
    });

// Valid user at login and  generate access token and refresh token

const getUserLogin = (req, res) => {
  const { name, password } = req.query;
  pool
    .query(`SELECT Name, Password, Email FROM public.user WHERE Name=$1`, [
      name,
    ])
    .then(result => {
      if (result.rowCount > 0) {
        const hashedPassword = result.rows[0].password;
        if (bcrypt.compareSync(password, hashedPassword)) {
          const accessToken = generateAccessToken(name);
          const refreshToken = generateRefreshToken(name);

          storeTokens(res, accessToken, refreshToken, name);

          res.cookie('accessToken', accessToken, {
            maxAge: 86400,
            httpOnly: true,
          });
          res.status(200).json({ message: 'success', accessToken });
        } else res.status(200).json({ message: 'password not match' });
      } else res.status(404).json({ message: 'user not found' });
    })
    .catch(err => {
      if (err) res.status(500).send(err);
    });
};

// create user and store into database
const createUser = (req, res) => {
  const { name, password, email } = req.query;
  const hashedPassword = bcrypt.hashSync(password, 10);
  pool
    .query(
      `INSERT INTO public.user (Name, Password, Email) VALUES ('${name}', '${hashedPassword}', '${email}');`,
    )
    .then(mes => {
      if (mes) res.status(200).json({ message: 'success' });
    })
    .catch(err => {
      if (err) res.status(500).json(err);
    });
  // .finally(()=>{
  //     pool.end()
  // })
};

module.exports = {
  getUserLogin,
  createUser,
};
