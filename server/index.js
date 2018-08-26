const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// DB Setup
mongoose.connect('mongodb://<>username:<password>@ds121665.mlab.com:<port>/<dbname>');

// App setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(cors());
router(app);

// Setup port
const port = process.env.PORT || 3090;
const server = http.createServer(app);

server.listen(port);
console.log('Server listenning on port', port);
