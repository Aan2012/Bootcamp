const yargs = require('yargs');
const contacts = require('./contacts');
//const { simpanContact } = require('./contacts');

yargs.command({
  command: "add",
  describe: "Menambahkan contact baru",
  builder: {
    nama: {
        describe: "Nama lengkap",
        demandOption: true,
        type: 'string',
    },
    email: {
        describe: "Email",
        demandOption: false,
        type: 'string',
    },
    noHP: {
        describe: "Nomor telpon",
        demandOption:true,
        type: 'string',
    },
  },
  handler(argv){
    contacts.simpanContact(argv.nama, argv.email, argv.noHP)
  },
});

yargs.parse();
/*
const {tulisPertanyaan, simpanContact} = require('./contacts');

const main = async() => {
    const nama = await tulisPertanyaan("Masukkan nama anda : ");
    const email = await tulisPertanyaan("Masukkan email anda : ");
    const noHP = await tulisPertanyaan("Masukkan noHP anda : ");

    simpanContact(nama, email, noHP);
}

main(); */
