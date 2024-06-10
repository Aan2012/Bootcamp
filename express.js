const express = require('express')
const app = express()
const port = 3000

app.use('/css', express.static('css'));

app.get('/', (req, res) => {
    res.sendFile('./xindex.html', {root: __dirname});
});

app.get('/about', (req, res) => {
    //res.send('ini page about');
    res.sendFile('./xabout.html', {root: __dirname});
});

app.get('/portofolio', (req, res) => {
    res.sendFile('./xportofolio.html', {root: __dirname});
});

app.get('/blog', (req, res) => {
    res.sendFile('./xblog.html', {root: __dirname});
});

app.get('/kontak', (req, res) => {
    res.sendFile('./xkontak.html', {root: __dirname});
});

app.use('/',(req, res) => {
    res.status(404);
    res.send('halaman tidak ditemukan!!');
})

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
});