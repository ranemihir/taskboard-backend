require('dotenv').config();

require('./model/db');

const express = require('express');
const app = express();

const PORT = 4000;

app.listen(PORT, () => console.log(`Node server: http://localhost:${PORT}`));