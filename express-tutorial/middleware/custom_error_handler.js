const errorHandler = (err, req, res, _next) => {
    if (err.status){
        res.status(err.status).send({msg : `${err.message}`} || err);
    } else {
        res.status(500).send({msg : err.message || "Error "});
    }
};

module.exports = errorHandler;