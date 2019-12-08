const introduce = require('../models/introduce');

module.exports = {
    create: async (req, res, next) => {
        const introduction = new introduce(req.body);
        await introduction.save();
        return res.status(200).json(introduction);
    },

    update: async (req, res) => {
        const introduction = await introduce.findById(req.params.id);

        // validate
        if (!introduction) return null;

        // copy userParam properties to user
        Object.assign(introduction, req.body);

        await introduction.save();
        return res.status(200).json(introduction);
    },

    getCurrent: (req, res, next) => {
        const intro = await introduce.findById(id);
        return res.status(200).json(intro);
    },
};
