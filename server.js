const express    = require('express');
const bodyParser = require('body-parser');
const morgan     = require('morgan');


const routes = require('./src/routes');


const app = express();

app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(routes);




app.listen(3000);

