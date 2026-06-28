//The logger middleware for application level
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.protocol}//:${req.get('host')} ${req.originalUrl}`)
    next();
}

export default logger;
