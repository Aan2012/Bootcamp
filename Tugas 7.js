const express = require("express");
const app = express();
//port webserver yg digunakan
const port = 3001;

//gunakan ejs
app.set("view engine", "ejs");

//membaca lokasi css berada
app.use("/css", express.static("css"));

app.get("/", (req, res) => {
  // res.sendFile("./"+ halaman + ".html", { root: __dirname });
  const datakontak = loadContact();
  res.render("index", {
    title: "Halaman Home",
    //datakontak,
  });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "Halaman About" });
});

app.get("/portofolio", (req, res) => {
  res.render("portofolio", { title: "Halaman Portofolio", path: "portofolio" });
});

app.get("/testimoni", (req, res) => {
  res.render("testimoni", { title: "Halaman Testimoni", path: "testimoni" });
});

app.get("/kontak/:nama", (req, res) => {
  //res.send(`Product ID: ${req.params.nama} <br> Category ID: ${req.query.category}`);
  const fs = require("fs");
  const dirPath = "data";
  //cek folder data
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
  //cek files json ada tidak
  const dataPath = "data/contacts.json";
  if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, "[]", "utf-8");
  }
  //baca files json
  const loadContact = () => {
    const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8");
    const contacts = JSON.parse(fileBuffer);
    return contacts;
  };
  //simpan data json ke contacts
  const contacts = loadContact();

  //mencari data yang sama di json
  const contact = contacts.find(
    (contact) => contact.nama.toUpperCase() === req.params.nama.toUpperCase()
  );

  //jika data yang dicari tidak ada dijson
  if (!contact) {
    //akan mengirim data kosong
    res.render("kontak", {
      title: "Halaman Kontak",
      nama: "",
      email: "",
      noHP: "",
    });
  } else {
    //akan mengisim data sesuai yang ada di json
    res.render("kontak", {
      title: "Halaman Kontak",
      nama: `${contact.nama}`,
      email: `${contact.email}`,
      noHP: `${contact.noHP}`,
    });
  }
});

//menampilkan status 404 jika halaman tdk ditemukan
app.use("/", (req, res) => {
  res.status(404);
  res.send("halaman tidak ditemukan!!");
});

//informasi port yg digunakan
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
