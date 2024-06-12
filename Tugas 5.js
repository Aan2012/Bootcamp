const yargs = require("yargs");
const contacts = require("./contacts");
//const { simpanContact } = require('./contacts');

yargs
  .command({
    command: "add",
    describe: "Menambahkan contact baru",
    builder: {
      nama: {
        describe: "Nama lengkap",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Email",
        demandOption: false,
        type: "string",
      },
      noHP: {
        describe: "Nomor telpon",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      contacts.simpanContact(argv.nama, argv.email, argv.noHP);
    },
    //menambahkan warning
  })
  .demandCommand();

//menampilkan daftar semua contact
yargs.command({
  command: "list",
  describe: "Menampilkan semua data nama & no HP contact",
  handler() {
    contacts.listContact();
  },
});

//menampikan detail sebuah kontak
yargs.command({
  command: "detail",
  describe: "Menampilkan detail sebuah contact berdasar nama",
  builder: {
    nama: {
      describe: "Detail data",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.detailContact(argv.nama);
  },
});

//menghapus sebuah contact
yargs.command({
  command: "delete",
  describe: "Menghapus sebuah nama",
  builder: {
    nama: {
      describe: "Hapus data",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.deleteContact(argv.nama);
  },
});

//update sebuah contact
yargs.command({
  command: "update",
  describe: "Update sebuah data",
  builder: {
    nama: {
      describe: "Update data",
      demandOption: true,
      type: "string",
    },
    email: {
      describe: "Update data",
      demandOption: true,
      type: "string",
    },
    noHP: {
      describe: "Update data",
      demandOption: true,
      type: "string",
    },
    namaedit: {
      describe: "Data nama baru",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.updateContact(argv.nama,argv.email,argv.noHP,argv.namaedit);
  },
});

yargs.parse();

// const {tulisPertanyaan, simpanContact} = require('./contacts');

// const main = async() => {
//     const nama = await tulisPertanyaan("Masukkan nama anda : ");
//     const email = await tulisPertanyaan("Masukkan email anda : ");
//     const noHP = await tulisPertanyaan("Masukkan noHP anda : ");

//     simpanContact(nama, email, noHP);
// }

// main();
