const express = require('express')
const app = express()
//port webserver yg digunakan
const port = 3000

//membaca lokasi css berada 
app.use('/css', express.static('css'));

//buat array menu
const arr  = { '': 'xindex', 'about': 'xabout', 'portofolio': 'xportofolio', 'testimoni': 'xtestimoni', 'kontak': 'xkontak' };

//tampilkan halaman sesuai request dari menu yang dipilih
Object.entries(arr).forEach(([menu, halaman]) => {
  app.get("/"+menu, (req, res) => {
    res.sendFile("./"+ halaman + ".html", { root: __dirname });
  });
});

//menampilkan status 404 jika halaman tdk ditemukan
app.use('/',(req, res) => {
    res.status(404);
    res.send('halaman tidak ditemukan!!');
})

//informasi port yg digunakan
app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
});