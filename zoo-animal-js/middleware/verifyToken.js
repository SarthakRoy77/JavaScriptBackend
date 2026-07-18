const jwt = require('jsonwebtoken');

//Add Verify Token Middleware
const verifyToken = (req, res, next) => {
    if (!req.cookies.token) {
        const err = new Error("Please login to access this route!");
        err.status = 403;
        return next(err);
    }
    try {
        req.verifiedData = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);

        if (!req.verifiedData) {
            const err = new Error("Sorry, We have a trouble authorizing! Please login correctly");
            err.status = 403;
            return next(err);
        }

        next();
    } catch (err) {
        next(err);
    }
};

module.exports = verifyToken;
