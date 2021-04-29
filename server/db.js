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
const getUserSignIn = (req, res) => {
  const { name, password } = req.query;

  pool
    .query(`SELECT Name, Password, Email FROM public.user WHERE Name=$1`, [
      name,
    ])
    .then(result => {
      if (result.rowCount > 0) {
        const hashedpassword = result.rows[0].password;
        if (bcrypt.compareSync(password, hashedpassword)) {
          const accessToken = jwt.sign({ name }, process.env.SECRET_VALUE, {
            expiresIn: 86400,
          });
          res.cookie('token', accessToken, { maxAge: 864000, httpOnly: true });
          res.status(200).json({ message: 'success', token: accessToken });
        } else res.status(200).json({ message: 'password not match' });
      } else res.status(404).json({ message: 'user not found' });
    })
    .catch(err => {
      if (err) res.status(500).json(err);
    });
};

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
  getUserSignIn,
  createUser,
};
