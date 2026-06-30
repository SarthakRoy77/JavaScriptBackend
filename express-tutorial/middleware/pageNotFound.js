const pageNotFound = (req, res, next) => {
    const error = new Error("The page You were looking for was not found");
    error.status(404);
    next(error);
};

module.exports = pageNotFound;