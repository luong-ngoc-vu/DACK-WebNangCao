const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    creator: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
});

schema.set('toJSON', { virtuals: true });

const tutorialSkillSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    skills: [{ type: Schema.Types.Array, ref: 'Skill' }],
})

const skill = mongoose.model('Skill', tutorialSkillSchema);
const tutorialSkill = mongoose.model('TutorialSkill', tutorialSkillSchema);
module.exports = tutorialSkill;