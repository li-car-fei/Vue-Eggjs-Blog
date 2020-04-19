const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: { type: String },
    isTop: {
        type: Boolean,
        default: false
    },
    summary: { type: String },
    body: { type: String },
    categories: [{
        type: mongoose.SchemaTypes.ObjectId,       // 指向 外键
        ref: 'Category'
    }]
}, {
    timestamps: true                            // 自动添加 建立和更改的时间
});

module.exports = mongoose.model('Article', schema, 'articles');