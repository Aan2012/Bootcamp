const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const { body, validationResult, check } = require("express-validator");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const { fetchContacts, fetchContactByName, addContact, deleteContact, updateContacts } = require('./utils/contacts');

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
