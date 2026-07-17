const errorHandler = (err, req, res, next) => {
    if (err.status) {
        return res.status(err.status).send({success: false, message: err.message});
    }
    else {
        return res.status(500).send({success: false, message: err.message});
    }
}

module.exports = errorHandler;