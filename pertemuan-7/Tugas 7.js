const express = require("express");
const app = express();
//port webserver yg digunakan
const port = 3001;
const fs = require("fs");
const dirPath = "data";
const data_json="data/contacts.json";

//cek folder data
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

//cek files json ada tidak
const dataPath = `${data_json}`;
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

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

//array nama page
const arr  = { '': 'index', 'about': 'about', 'portofolio': 'portofolio', 'testimoni': 'testimoni'};
//static page
Object.entries(arr).forEach(([menu, halaman]) => {
  app.get("/"+menu, (req, res) => {
    res.render(`${halaman}`, { title: `Halaman ${halaman}` });
  });
});
//dynamic page
app.get("/kontak/:nama", (req, res) => {

  //baca files json
  const loadContact = () => {
    const fileBuffer = fs.readFileSync(`${data_json}`, "utf-8");
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
