const fs = require("fs");
const readline = require("readline");
const validator = require("validator");
const regex = /^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//membuat folder data apabila tidak ada
const dirPath = "data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

//membat file contact.json
const dataPath = "data/contact.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

rl.question("Siapa namamu: ", (name) => {
  rl.question("Nomor handphone (format: 081234567890): ", (mobile) => {
    //validasi inputan no telp
    //if (regex.test(mobile)) {
    if(validator.isMobilePhone(mobile, 'id-ID')){
      rl.question("Email: ", (email) => {
        //validasi inputan email
        if (validator.isEmail(email)) {
          const contact = { name, mobile, email };
          const file = fs.readFileSync(dataPath, "utf8");
          const contacts = JSON.parse(file);
          contacts.push(contact);
          fs.writeFileSync(dataPath, JSON.stringify(contacts));
          console.log("terimakasih!");
          //jika inputan email tidak sesuai
        } else {
          console.log("Email tidak valid.");
        }
        rl.close();
      });
    } else {
      console.log(
        "Nomor handphone tidak valid. Pastikan formatnya benar (contoh: 081234567890)."
      );
      rl.close();
    }
  });
});
