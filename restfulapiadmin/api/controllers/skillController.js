const skillService =require( '../services/skillServices');


exports.create = (req, res, next) => {
    skillService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

exports.getAll = (req, res, next) => {
    skillService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

exports.getById = (req, res, next) => {
    skillService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

exports.update = (req, res, next) => {
    skillService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

exports._delete = (req, res, next) => {
    skillService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

