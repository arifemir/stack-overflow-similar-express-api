const express = require('express');
const dotenv = require('dotenv');

dotenv.config({
  path: './config/env/config.env'
})

const app = express();
const PORT = 5000 || process.env.PORT;


app.get('/',(req,res) => {
  res.send('hi');
})

app.listen(PORT,() => {
  console.log('served to '+PORT + process.env.NODE_ENV);
})