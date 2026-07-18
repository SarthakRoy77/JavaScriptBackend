const express = require('express');
const routes = require('./routes/queryRoutes.js');
const animalRoutes = require('./routes/animalRoutes.js');
const cookies = require('cookie-parser');
require('dotenv').config({quiet: true});

//Add app initialization
const app = express();

//Add general middleware
app.use(express.json());
app.use(cookies());
app.use(express.urlencoded({extended: false}));

//Set Up routes
app.use('/api', routes);
app.use('/api', animalRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})
