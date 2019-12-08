const userService = require('../services/normalUserService');

exports.getAllClient = (req, res, next) => {
    userService.getAll()
        .then(() => res.json({}))
        .catch(err => next(err));
}

exports.getAClient = (req, res, next) => {
    userService.getByEmail(req.params.email)
        .then(() => res.json({}))
        .catch(err => next(err));
}
