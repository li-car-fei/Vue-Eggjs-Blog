const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,       // 指向 外键
        ref: 'User'
    },
    article: {
        type: mongoose.SchemaTypes.ObjectId,       // 指向 外键
        ref: 'Article'
    },
    content: { type: String }
}, {
    timestamps: true                            // 自动添加 建立和更改的时间
});

module.exports = mongoose.model('Comment', schema, 'comments');