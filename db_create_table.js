require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
});
pool.connect();

const createTableQuery = [
  `CREATE TABLE IF NOT EXISTS public.user (
    ID serial NOT NULL,
    Name VARCHAR(155) NOT NULL UNIQUE,
    Email VARCHAR(155) NOT NULL UNIQUE,
    Password VARCHAR(155) NOT NULL UNIQUE,
    Supplier_ID INT,
    Buyer_ID INT,
    Created_At DATE NOT NULL DEFAULT CURRENT_DATE,
    Deleted_At DATE NULL,
    Updated_At DATE NULL,
    Token VARCHAR(155),
    Refresh_Token VARCHAR(155),
    PRIMARY KEY(id)
  );`,
  `CREATE TABLE IF NOT EXISTS buyer (
    ID serial,
    Name VARCHAR(155),
    ABN VARCHAR(155),
    Logo TEXT,
    Create_AT DATE NOT NULL DEFAULT CURRENT_DATE,
    Delete_AT DATE NULL,
    Update_AT DATE NULL
  );`,
  `CREATE TABLE IF NOT EXISTS tender (
    ID serial,
    Buyer_ID INT,
    State_ID INT,
    City_ID INT,
    Offer NUMERIC(11,2),
    Published_AT DATE,
    Closing_AT DATE,
    Description TEXT,
    Create_AT DATE NOT NULL DEFAULT CURRENT_DATE,
    Delete_AT DATE NULL,
    Update_AT DATE NULL
  );`,
  `CREATE TABLE IF NOT EXISTS tender_attachment (
    ID serial,
    Tender_ID INT,
    URL VARCHAR(155)
  );`,
  `CREATE TABLE IF NOT EXISTS city (
    ID serial,
    State_ID INT,
    Name VARCHAR(155)
  );`,
  `CREATE TABLE IF NOT EXISTS state (
    ID serial,
    Name VARCHAR(155),
    Acronym VARCHAR(4)
  );`,
  `CREATE TABLE IF NOT EXISTS supplier (
    ID serial,
    Name VARCHAR(155),
    ABN VARCHAR(155),
    Logo TEXT,
    Create_AT DATE NOT NULL DEFAULT CURRENT_DATE,
    Delete_AT DATE NULL,
    Update_AT DATE NULL
  );`,
  `CREATE TABLE IF NOT EXISTS supply_category_supplier (
    Supply_Category_ID INT,
    Supplier_ID INT
  );`,
  `CREATE TABLE IF NOT EXISTS supply_category (
    ID serial,
    Name VARCHAR(155),
    Description TEXT,
    Supply_Category_ID INT
  );`,
  `CREATE TABLE IF NOT EXISTS proposal (
    ID serial,
    Tender_ID INT,
    Supplier_ID INT,
    Description TEXT,
    Approved_At DATE,
    Offer NUMERIC(11,2),
    Created_At DATE NOT NULL DEFAULT CURRENT_DATE,
    Update_At DATE,
    Deleted_At DATE
  );`,
  `CREATE TABLE IF NOT EXISTS proposal_attachment (
    ID serial,
    Proposal_ID VARCHAR(155),
    URL VARCHAR(155)
  );`,
];

for (let i = 0; i < createTableQuery.length; i += 1) {
  pool
    .query(createTableQuery[i])
    .then()
    .catch(err => {
      throw err;
    });
}
pool
  .query(
    `INSERT INTO public.user (name, email, password) VALUES ('admin', 'admin@mail', 'admin');`,
  )
  .then()
  .catch(err => {
    throw err;
  });

pool
  .query(`SELECT * FROM public.user ;`)
  .then()
  .catch(err => {
    throw err;
  });
pool.end();
process.exit(1);
