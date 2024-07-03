const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
/*
rl.question('Siapa namamu? ', (name) => {
  console.log(`halo, ${name}!`);
  var nama ="nama saya adalah: "+ name;
  fs.writeFileSync('readline.txt',nama);
  rl.close();
}); */

rl.question('Nama saya : ', (jwb1) => {
  rl.question('Pekerjaan : ', (jwb2) => {
      var result = "nama saya: "+ jwb1 + ' \n pekerjaan sebagai: ' + jwb2;
      console.log(`*********************************\nhasil jawaban:\n ${result}`);
      fs.writeFileSync('readline.txt',`*********************************\nhasil jawaban:\n ${result}`);
      
      rl.close();
  });
});