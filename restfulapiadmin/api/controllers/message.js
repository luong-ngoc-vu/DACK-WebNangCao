const messageService = require('../services/messageService');


exports.getAll = (req, res, next) => {
    messageService.getAll(req.params.from, req.params.to, req.params.limit)
        .then(mes => {
            console.log(mes);
            res.json(mes)
        })
        .catch(err => next(err));
}


