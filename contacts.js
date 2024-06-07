const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");
/*
const readline = require ('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
*/

const dirPath = "data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}
/*
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}*/
const dataPath = "data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

/*
const tulisPertanyaan = (pertanyaan) => {
    return new Promise((resolve, reject)=>{
        rl.question(pertanyaan, (nama) =>{
            resolve(nama);
        });
    });
}; */

const simpanContact = (nama, email, noHP) => {
  const contact = { nama, email, noHP };
  const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(fileBuffer);

  //cek duplikat
  const duplikat = contacts.find((contact) => contact.nama.toUpperCase() === nama.toUpperCase());
  if (duplikat) {
    console.log(
      //'Data sudah ada, silahkan gunakan data lain!'
      chalk.red.inverse.bold("Data sudah ada, silahkan gunakan data lain!")
    );
    return false;
  }

  //cek email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(
        chalk.red.inverse.bold("Email tidak valid!")
      );
      return false;
    }
  }

  //cek noHP
  if (noHP) {
    if (!validator.isMobilePhone(noHP, 'id-ID')) {
      console.log(
        chalk.red.inverse.bold("noHP tidak valid!")
      );
      return false;
    }
  }

  contacts.push(contact);
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

  console.log(
    chalk.green.inverse.bold("Terimakasih")
  );
  //rl.close();
};

module.exports = { simpanContact };
//module.exports = { tulisPertanyaan, simpanContact };
