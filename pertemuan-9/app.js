const express = require("express");
const app = express();
const expressLayouts = require('express-ejs-layouts');
const validator = require("validator");

//gunakan ejs
app.set('view engine', 'ejs');
// Set Templating Engine
app.use(expressLayouts);
app.set('layout', './layouts/main-layout');
//middleware parsing data
app.use(express.urlencoded({ extended: true }));

//port webserver yg digunakan
const port = 3000;
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

//baca data json
const loadContact = () => {
  const fileBuffer = fs.readFileSync(`${data_json}`, "utf-8");
  const contacts = JSON.parse(fileBuffer);
  return contacts;
};

const datakontak = loadContact();

//membaca lokasi css berada
app.use("/css", express.static("css"));

app.get("/", (req, res) => {
  res.render("index", { title: "Halaman Home", datakontak });
});

app.post("/", (req, res) => {

  //baca data baru yang dikirim
  const nama = req.body.nama;
  const editnama = req.body.editnama;
  const hapusnama = req.body.hapusnama;
  const noHP = req.body.nohp;
  const email = req.body.email;
      
  //cek duplikat
  // const duplikat = contacts.find(
  //   (contact) => contact.nama.toUpperCase() === req.body.nama.toUpperCase()
  // );

  // const newContacts = contacts.filter(
  //   (contact) => contact.nama.toUpperCase() !== nama.toUpperCase()
  // );

  if (editnama) {
    //simpan value post ke array
    const dataedit = { nama, email, noHP };
    const editdata = datakontak.filter(
      (contact) => contact.nama !== editnama
    );    
    //push data baru ke array data yang ada
    editdata.push(dataedit);
    //simpan
    fs.writeFileSync("data/contacts.json", JSON.stringify(editdata));

  }else if (hapusnama) {
      //simpan value post ke array
      const hapusdata = datakontak.filter(
        (contact) => contact.nama !== hapusnama
      );    
      //simpan
      fs.writeFileSync("data/contacts.json", JSON.stringify(hapusdata));
  }else{
    //simpan value post ke array
    const databaru = { nama, email, noHP };

    //push data baru ke array data yang ada
    datakontak.push(databaru);
    //simpan
    fs.writeFileSync("data/contacts.json", JSON.stringify(datakontak));
  }
    
  //kirim hasil post data
  // addContact(req.body);
  //res.send(contacts.nama +' '+namaedit+' '+namabaru);
  //redirect ke halaman awal
  res.redirect('/');;
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