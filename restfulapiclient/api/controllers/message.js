const messageService = require('../services/messageService');
//Test with mock service
//const userService = require('../services/userMock');

// exports.create = (req, res, next) => {
//     messageService.create(req.body)
//         .then((user) => res.json(user))
//         .catch(err => next(err));
// }

exports.getAll = (req, res, next) => {
    messageService.getAll(req.params.from, req.params.to, req.params.limit)
        .then(mes => {
            console.log(mes);
            res.json(mes)
        })
        .catch(err => next(err));
}

exports.getCurrent = (req, res, next) => {
    messageService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

exports.getById = (req, res, next) => {
    messageService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

exports.markRead = (req, res, next) => {
    messageService.update(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
exports.getUnreadMessage = (req, res, next) => {
    messageService.getUnreadMessage(req.params.to)
        .then((mes) => res.json(mes))
        .catch(err => next(err));
}
exports._delete = (req, res, next) => {
    messageService.delete(req.params.id)
        .then(() => res.json('Deleted'))
        .catch(err => next(err));
}

