require('dotenv').config();

const express = require('express');
const app = express();
const { authRouter, verifyToken } = require('./middleware/auth');

app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));

app.use(authRouter);
app.use(verifyToken);


const PORT = 4000;

app.listen(PORT, () => console.log(`Node server: http://localhost:${PORT}`));