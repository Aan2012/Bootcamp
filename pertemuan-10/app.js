const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const { body, validationResult, check } = require("express-validator");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

//port webserver yg digunakan
const port = 3000;

//setup ejs
app.set("view engine", "ejs");
// Set Templating Engine
app.use(expressLayouts);
app.set("layout", "layouts/main-layout");
//middleware parsing data
app.use(express.urlencoded({ extended: true }));

//konfigurasi flash
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

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

//halaman home
app.get("/", async (req, res) => {
  // try {
  //   const contacts = await fetchContacts(); // Mengambil data kontak dari database
  //   console.log('Data kontak:', contacts); // Menampilkan data kontak di server console (opsional)
  //   res.json(contacts); // Mengirimkan data kontak sebagai JSON response
  // } catch (error) {
  //   console.error('Gagal mengambil data kontak:', error);
  // }
  const contacts = await fetchContacts();
  res.render("index", {
    title: "Halaman Home",
    layout: "layouts/main-layout",
    contacts,
    msg: req.flash("msg"),
  });
});

//halaman form tambah data
app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    title: "Form Tambah Data Contact",
    layout: "layouts/main-layout",
  });
});

//proses tambah data
app.post(
  "/contact",
  [
    body("nama").custom(async (value) => {
      const duplikat = await fetchContactByName(value);
      if (duplikat) {
        throw new Error("Nama Contact sudah ada!");
      }
      return true;
    }),
    check("email", "Email tidak valid!").isEmail(),
    check("noHP", "noHP tidak valid").isMobilePhone("id-ID"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("add-contact", {
        title: "Form Tambah Data",
        layout: "layouts/main-layout",
        errors: errors.array(),
      });
    } else {
      await addContact(req.body);
      //kirim flash message
      req.flash("msg", "Data Contact berhasil ditambahkan!");
      res.redirect("/");
    }
  }
);

//hapus contact
app.get("/contact/delete/:nama", async (req, res) => {
  const nama = req.params.nama;
  const contact = await fetchContactByName(nama);

  //jika contact tidak ada
  if (!contact) {
    res.status(404);
    res.send("<h1>data tidak ditemukan!</h1>");
  } else {
    // Hapus kontak dari database
    await deleteContact(nama);

    //kirim flash message
    req.flash("msg", "Data Contact berhasil dihapus!");
    res.redirect("/");
  }
});

//form ubah data contact
app.get("/contact/edit/:nama", async (req, res) => {
  const nama = req.params.nama;
  const contact = await fetchContactByName(nama);

  res.render("edit-contact", {
    title: "Form Ubah Data Contact",
    layout: "layouts/main-layout",
    contact,
  });
});

//proses ubah data
app.post(
  "/contact/update",
  [
    body("nama").custom(async (value, { req }) => {
      const duplikat = await fetchContactByName(value);
      if (value !== req.body.namalama && duplikat) {
        throw new Error("Nama Contact sudah ada!");
      }
      return true;
    }),
    check("email", "Email tidak valid!").isEmail(),
    check("noHP", "noHP tidak valid").isMobilePhone("id-ID"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("edit-contact", {
        title: "Form Ubah Data",
        layout: "layouts/main-layout",
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      const { nama, email, noHP, namalama } = req.body;
      // Panggil fungsi untuk melakukan update data kontak
      await updateContacts(nama, email, noHP);

      //kirim flash message
      req.flash("msg", "Data Contact berhasil diubah!");
      res.redirect("/");
    }
  }
);

//detail contact
app.get("/contact/:nama", async (req, res) => {
  //const contact = findContact(req.params.nama);
  const nama = req.params.nama;
  const contact = await fetchContactByName(nama);

  res.render("detail", {
    title: "Halaman Detail Contact",
    layout: "layouts/main-layout",
    contact,
  });
});

// Mengatur server untuk mendengarkan port tertentu
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
