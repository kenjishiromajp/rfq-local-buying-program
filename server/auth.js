require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require('./key');

const pool = new Pool({
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
});
pool.connect();

// Generate access token
const generateAccessToken = userID =>
  jwt.sign({ userID }, ACCESS_TOKEN_SECRET, { expiresIn: 86400 });

// generate refresh token
const generateRefreshToken = userID =>
  jwt.sign({ userID }, REFRESH_TOKEN_SECRET);

// Store tokens into into database for corresponding user
const storeTokens = (res, token, refreshToken, userID) =>
  pool
    .query('UPDATE public.user SET token=$1, refresh_token=$2 WHERE id=$3', [
      token,
      refreshToken,
      userID,
    ])
    .catch(err => {
      res.status(500).send(err);
    });

// Valid user at login and  generate access token and refresh token

const postUserLogin = (req, res) => {
  // const {name, password} = req.query
  const { name, password } = req.body;
  pool
    .query(`SELECT ID, Name, Password, Email FROM public.user WHERE Name=$1`, [
      name,
    ])
    .then(result => {
      if (result.rowCount > 0) {
        const userID = result.rows[0].id;
        const hashedPassword = result.rows[0].password;
        if (bcrypt.compareSync(password, hashedPassword)) {
          const accessToken = generateAccessToken(userID);
          const refreshToken = generateRefreshToken(userID);
          storeTokens(res, accessToken, refreshToken, userID);
          res.cookie('token', accessToken, { maxAge: 864000, httpOnly: true });
          res.status(200).send({ success: true, accessToken });
          // res.header('authorization', accessToken).status(200).send({ success: true, accessToken })
        } else
          res
            .status(200)
            .json({ success: false, message: 'password not match' });
      } else
        res.status(404).json({ success: false, message: 'user not found' });
    })
    .catch(err => {
      if (err) res.status(500).send(err);
      // console.log(err)
    });
};

const getUserLogout = (req, res) => {
  const { name } = req.query;
  pool
    .query(
      `UPDATE public.user 
      SET token=NULL, refresh_token=NULL
      WHERE name=$1`,
      [name],
    )
    .then(mes => {
      if (mes) res.status(200).json({ success: true });
    })
    .catch(err => {
      if (err) res.status(500).json(err);
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
      if (mes) res.status(200).json({ success: true });
    })
    .catch(err => {
      if (err) res.status(500).json(err);
    });
};

const updateUser = (req, res) => {
  const { name, password, email, newUserName } = req.query;
  const hashedPassword = bcrypt.hashSync(password, 10);
  pool
    .query(
      `UPDATE public.user  
      SET Name=$1, password=$2, email=$3
      WHERE Name=$4`,
      [newUserName, hashedPassword, email, name],
    )
    .then(mes => {
      if (mes) res.status(200).json({ success: true });
    })
    .catch(err => {
      if (err) res.status(500).json(err);
    });
};

const deleteUser = (req, res) => {
  const { name } = req.query;
  pool
    .query(`DELETE FROM public.user WHERE Name=$1`, [name])
    .then(mes => {
      if (mes) res.status(200).json({ success: true });
    })
    .catch(err => {
      if (err) res.status(500).json(err);
    });
};

module.exports = {
  postUserLogin,
  getUserLogout,
  createUser,
  updateUser,
  deleteUser,
};
