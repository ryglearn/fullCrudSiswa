const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const port = process.env.LISTEN_PORT || 3000;
const app = express();
const siswaRoutes = require('./routes/siswaRoutes');

app.use(cors());// allow semua fetch dari domain berbeda
app.use(express.json());// pakai middleware agar express bisa membaca json

app.use('/api/siswa', siswaRoutes);
app.get('/', (req,res)=>{
    return res.json({message:"SERVER BERHASIL BERJALAN, GUNAKAN PREFIX -> /api/siswa "})
}); // root prefix 


app.use((err,req,res,next)=>{
    console.log(err.stack);
    return res.status(err.status || 500).json({message: err.message || "Terjedi Kesalahan"});
})


app.listen(port, ()=>{
    console.log(`SERVER BERJALAN DI ${port}`);
});