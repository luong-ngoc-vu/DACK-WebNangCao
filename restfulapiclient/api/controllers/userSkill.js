const tutorialSkill = require('../models/tutorialSkill');

module.exports = {
    create: async (req, res, next) => {
        if (req.user.role !== 2) return res.status(401).json('Access deny');
        const introduction = new tutorialSkill(
            {
                user: req.user._id,
                skills: req.body.skills
            });
        await introduction.save();
        console.log(introduction);
        return res.status(200).json(introduction);
    },

    update: async (req, res) => {
        const introduction = await tutorialSkill.findById(req.user._id);
        
        // validate
        if (!introduction) return null;

        // copy userParam properties to user
        Object.assign(introduction.skills, req.body.skills);

        await introduction.save();
        return res.status(200).json(introduction);
    },

    getCurrent: async (req, res, next) => {
        //console.log(req);
        const intro = await tutorialSkill.findById(req.query.id);
        return res.status(200).json(intro);
    },
};
