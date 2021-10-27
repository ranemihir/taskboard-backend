require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const { authRouter, verifyToken } = require('./middleware/auth');
const { projectsRouter, projectRolesRouter, tasksRouter } = require('./routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));

app.use(authRouter);
app.use(verifyToken);

app.use(projectsRouter);
app.use(projectRolesRouter);
app.use(tasksRouter);

const PORT = 4000;

app.listen(PORT, () => console.log(`Node server: http://localhost:${PORT}`));