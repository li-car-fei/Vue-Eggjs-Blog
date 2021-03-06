const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false,            // 查询不会返回
        set(value) {
            // 设置或更改时，加密
            return bcrypt.hashSync(value, 10);
        }
    },
    imgUrl: {
        type: String
    },
    fav: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Article'
    }]
});

module.exports = mongoose.model('User', schema);