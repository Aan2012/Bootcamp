const { json } = require("express");
const fs = require("fs");
const { contains } = require("validator");
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "admin",
  database: "contacts",
  host: "localhost",
  port: 5432,
});

// Handler untuk mengambil data kontak dari PostgreSQL
const fetchContacts = async () => {
  let client;
  try {
    client = await pool.connect();
    const queryText = "SELECT * FROM contact";
    const result = await client.query(queryText);
    return result.rows; // Mengembalikan array dari baris hasil query
  } catch (error) {
    //console.error('ambil data gagal:', error);
    throw error; // Melempar error untuk penanganan lebih lanjut
  } finally {
    if (client) {
      client.release(); // Melepaskan koneksi (penting untuk dikembalikan ke db)
    }
  }
};

//cari data by nama
async function fetchContactByName(nama) {
  let client;
  try {
    client = await pool.connect();
    const queryText = "SELECT * FROM contact WHERE nama = $1";
    const result = await client.query(queryText, [nama]);
    return result.rows[0]; // Mengembalikan objek kontak pertama yang ditemukan
  } catch (error) {
    // console.error('Gagal mengambil kontak:', error);
    throw error; // Melempar error untuk penanganan lebih lanjut
  } finally {
    if (client) {
      client.release(); // Melepaskan koneksi (penting untuk dikembalikan ke pool)
    }
  }
}

//simpan value form
async function addContact(contactData) {
  const { nama, email, noHP } = contactData;
  const queryText =
    'INSERT INTO contact (nama, email, "noHP") VALUES ($1, $2, $3)';
  const values = [nama, email, noHP];

  let client;
  try {
    client = await pool.connect();
    await client.query(queryText, values);
    // console.log('Data kontak berhasil ditambahkan');
  } catch (error) {
    // console.error('Gagal menambahkan data kontak:', error);
    throw error; // Melempar error untuk penanganan lebih lanjut
  } finally {
    if (client) {
      client.release(); // Melepaskan koneksi (penting untuk dikembalikan ke pool)
    }
  }
}

//hapus data
async function deleteContact(nama) {
  const queryText = "DELETE FROM contact WHERE nama = $1";
  const values = [nama];

  let client;
  try {
    client = await pool.connect();
    await client.query(queryText, values);
    // console.log(`Data kontak dengan nama ${nama} berhasil dihapus`);
    // } catch (error) {
    //   console.error(`Gagal menghapus data kontak dengan nama ${nama}:`, error);
    throw error; // Melempar error untuk penanganan lebih lanjut
  } finally {
    if (client) {
      client.release(); // Melepaskan koneksi (penting untuk dikembalikan ke pool)
    }
  }
}

//update data
async function updateContacts(nama, email, noHP) {
  const client = await pool.connect();
  try {
    const queryText = `
      UPDATE contact
      SET email = $2, "noHP" = $3
      WHERE nama = $1
    `;
    const values = [nama, email, noHP];
    const result = await client.query(queryText, values);
    return result.rowCount; // Mengembalikan jumlah baris yang berhasil diupdate
  } finally {
    client.release(); // Melepaskan koneksi kembali ke pool
  }
}

module.exports = {
  fetchContacts,
  fetchContactByName,
  addContact,
  deleteContact,
  updateContacts,
};
