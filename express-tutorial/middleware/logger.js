require('colors');
//The logger middleware for application level
const logger = (req, res, next) => {
    const httpMethodColors = {
        GET: 'green',
        POST: 'blue',
        PUT: 'yellow',
        DELETE: 'red',
    };

    const color = httpMethodColors[req.method];

    console.log(`${req.method} ${req.protocol}//:${req.get('host')} ${req.originalUrl}`[color]);
    next();
}

module.exports = logger;
