const adminService = require('../services/adminService');
//Test with mock service
//const userService = require('../services/userMock');

exports.authenticate = (req, res, next) => {
    console.log(req.body);
    adminService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

exports.create = (req, res, next) => {
    adminService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

exports.getAll = (req, res, next) => {
    adminService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

exports.getCurrent = (req, res, next) => {
    adminService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

exports.getById = (req, res, next) => {
    adminService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

exports.update = (req, res, next) => {
    adminService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

exports._delete = (req, res, next) => {
    adminService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

