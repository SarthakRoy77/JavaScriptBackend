const express = require('express');
const routes = require('./routes/queryRoutes.js');
const cookies = require('cookie-parser');
require('dotenv').config({quiet: true});

//Add app initialization
const app = express();

//Add general middleware
app.use(express.json());
app.use(cookies());
app.use(express.urlencoded({extended: false}));

app.use('/api', routes);

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})
