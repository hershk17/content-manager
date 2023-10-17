import pg from "pg";
const { Pool } = pg;

import dotenv from "dotenv";
dotenv.config();

const credentials = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

const pool = new Pool(credentials);

export default pool;
