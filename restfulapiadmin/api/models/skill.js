const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    _id: {type: String, required: true},
    name: { type: String, required: true },
    creator: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
});

schema.set('toJSON', { virtuals: true });
schema.pre('save', function(next) {
    var doc = this;
    counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }, function(error, counter)   {
        if(error)
            return next(error);
        doc.testvalue = counter.seq;
        next();
    });
});

const skill = mongoose.model('Admin', schema);
module.exports = skill;