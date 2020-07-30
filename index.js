const express = require('express')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({
  path: './config/env/config.env'
})

require('./helpers/database/connectDatebase')();

const app = express();
const PORT = 5000 || process.env.PORT;

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', require('./routes'))

app.use(require('./middlewares/errors/customErrorHandler'))

app.listen(PORT, () => {
  console.log('served to '+PORT + " " + process.env.NODE_ENV)
})