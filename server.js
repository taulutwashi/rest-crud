const express    = require('express');
const bodyParser = require('body-parser');
const morgan     = require('morgan');

const routes = require('./src/routes');

const app = express();

app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(routes);

const port = process.env.PORT || 3000;

app.listen(port,() => console.info(`Server started on port ${port}`));

