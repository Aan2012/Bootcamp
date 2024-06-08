const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");

// const readline = require ('readline');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

const dirPath = "data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// if(!fs.existsSync(dataPath)){
//     fs.writeFileSync(dataPath, '[]', 'utf-8');
// }

const dataPath = "data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

// const tulisPertanyaan = (pertanyaan) => {
//     return new Promise((resolve, reject)=>{
//         rl.question(pertanyaan, (nama) =>{
//             resolve(nama);
//         });
//     });
// };

const loadContact = () => {
  const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(fileBuffer);
  return contacts;
};

const simpanContact = (nama, email, noHP) => {
  const contact = { nama, email, noHP };
  // const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8");
  // const contacts = JSON.parse(fileBuffer);
  const contacts = loadContact();

  //cek duplikat
  const duplikat = contacts.find(
    (contact) => contact.nama.toUpperCase() === nama.toUpperCase()
  );
  if (duplikat) {
    console.log(
      //'Data sudah ada, silahkan gunakan data lain!'
      chalk.red.inverse.bold("Data sudah ada, silahkan gunakan data lain!")
    );
    return false;
  }

  //cek penulisan email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse.bold("Email tidak valid!"));
      return false;
    }
  }

  //cek penulisan noHP
  if (noHP) {
    if (!validator.isMobilePhone(noHP, "id-ID")) {
      console.log(chalk.red.inverse.bold("noHP tidak valid!"));
      return false;
    }
  }

  contacts.push(contact);
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
  console.log(chalk.green.inverse.bold("Terimakasih"));
  //rl.close();
};

//menampilkan semua data yang ada di json mulai dari 0
const listContact = () => {
  const contacts = loadContact();
  console.log(chalk.yellow.inverse.bold("Dartar Kontak : "));
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`);
  });
};

const detailContact = (nama) => {
  const contacts = loadContact();

  //mencari data yang sama di json
  const contact = contacts.find(
    (contact) => contact.nama.toUpperCase() === nama.toUpperCase()
  );

   //notifikasi jika data nama yang di edit tidak ketemu
  if (!contact) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
    return false;
  }

  //menampilkan data sesuai data yang ada di json
  console.log(chalk.yellow.inverse.bold(contact.nama));
  console.log(chalk.yellow.inverse.bold(contact.noHP));
  if (contact.email) {
    console.log(chalk.yellow.inverse.bold(contact.email));
  }
};

const deleteContact = (nama) => {
  const contacts = loadContact();
  //membaca data yang ada selain yang dihapus
  const newContacts = contacts.filter(
    (contact) => contact.nama.toUpperCase() !== nama.toUpperCase()
  );

  //notifikasi jika data nama yang di edit tidak ketemu
  if (contacts.length === newContacts.length) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
    return false;
  }
  //menyimpan semua data selain data yang dihapus
  fs.writeFileSync("data/contacts.json", JSON.stringify(newContacts));
  console.log(chalk.green.inverse.bold(`${nama} berhasil dihapus`));

};

const updateContact = (nama,email,noHP,namaedit) => {

  const contacts = loadContact();
  
  //baca data yang selain yg di update
  const datalain = contacts.filter(
    (datalain) => datalain.nama.toUpperCase() !== namaedit.toUpperCase()
  );

  //cari data nama yang sama
  const contact = contacts.find(
    (contact) => contact.nama.toUpperCase() === namaedit.toUpperCase()
  );
  
  //notifikasi jika data nama yang di edit tidak ketemu
  if (!contact) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
    return false;
  }

  //menampilkan data yang di edit
   console.log(chalk.yellow.inverse.bold(contact.nama));
   console.log(chalk.yellow.inverse.bold(contact.noHP));
  if (contact.email) {
    console.log(chalk.yellow.inverse.bold(contact.email));
  }
  
  const newHP = noHP; 
  const newemail = email;
  //cek data noHP yang di edit dengan data baru sama tidak
  if(contact.noHP===noHP){
    const noHP = (contact.noHP);   
  }else{
    const noHP = newHP;
  }

  //cek data email yang di edit dengan data baru sama tidak
  if(contact.email===email){
    const email = (contact.email);
  }else{
    const email = newemail;  
  }
  //array value data baru
  const newData = { nama,noHP,email };
  //menyimpan data baru ke data yang sudah ada
  datalain.push(newData);
  //menyimpan data lama selain yang di edit ke json
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
  //menyimpan data baru dan data lama ke json
  fs.writeFileSync("data/contacts.json", JSON.stringify(datalain));
  //notifikasi jika edit berhasil
  console.log(chalk.green.inverse.bold("Update data berhasil!"));
};

module.exports = { simpanContact, listContact, detailContact, deleteContact, updateContact };
//module.exports = { tulisPertanyaan, simpanContact };
