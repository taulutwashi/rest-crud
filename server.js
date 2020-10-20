const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const router = require('./src/router');

const app = express();

app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(router);

const port = process.env.PORT || 3000;
app.listen(port, () => console.info(`Server started on port ${port}`));
