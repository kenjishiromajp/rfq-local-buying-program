const express = require('express');

const router = express.Router();
const { pool } = require('./db');

router.post('/suppliers', (req, res) => {
  const { name, ABN, Logo } = req.query;
  // do something for suppliers

  pool
    .query(
      `INSERT INTO supplier (Name, ABN, Logo)
            VALUES ($1, $2, $3)
        `,
      [name, ABN, Logo],
    )
    .then(result => {
      if (result) res.status(200).json({ success: true });
    })
    .catch(err => {
      if (err) res.status(500).json(err);
    });
});

router.get('suppliers/:id', (req, res) => {
  const { id } = req.query;
  pool
    .query(`SELECT * FROM supplier WHERE ID=$1`, [id])
    .then(result => {
      res.status(200).json({ success: true, supplier: result });
    })
    .catch(err => {
      if (err) res.status(500).json(err);
    });
});
