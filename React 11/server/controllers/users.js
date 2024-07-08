import pkg from 'pg';

import { v4 as uuid } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export const getUsers = async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM contact');
    client.release();
    res.send(result.rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error retrieving contact from database');
  }
};

export const createUser = async (req, res) => {
  const { name, email, contact } = req.body;
  const id = uuid();

  try {
    const client = await pool.connect();
    await client.query('INSERT INTO contact (id, name, email, contact) VALUES ($1, $2, $3, $4)', [id, name, email, contact]);
    client.release();
    res.send("User Added Successfully");
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error adding user to database');
  }
};

export const getUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM contact WHERE id = $1', [userId]);
    client.release();
    res.send(result.rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error retrieving user from database');
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const client = await pool.connect();
    await client.query('DELETE FROM contact WHERE id = $1', [userId]);
    client.release();
    res.send("User Deleted Successfully");
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error deleting user from database');
  }
};

export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email, contact } = req.body;

  try {
    const client = await pool.connect();
    await client.query('UPDATE contact SET name = $1, email = $2, contact = $3 WHERE id = $4', [name, email, contact, userId]);
    client.release();
    res.send("User Updated Successfully");
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error updating user in database');
  }
};
