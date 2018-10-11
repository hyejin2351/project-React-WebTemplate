
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ArticleSchema = new Schema({
    user: ObjectId,
    title: { type: String, required: true },
    content: { type: String, required: true },
    views: { type: Number, default: 0 },
    created: { type: Date,  default: Date.now }
});

ArticleSchema.virtual('id')
    .get(function rename() {
        return this._id.toHexString();
    });

module.exports = mongoose.model('Article', ArticleSchema);