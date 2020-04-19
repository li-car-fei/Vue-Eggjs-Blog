const jwt = require('jsonwebtoken');
const User = require('../models/User');


module.exports = options => {


    return async (ctx, next) => {

        //从请求头中拿出token
        const token = String(ctx.request.headers.authorization || '').split(" ").pop()

        // const token = String(ctx.cookies.get('user_token', {
        //     encrypt: true
        // }));

        console.log(token);

        //console.log(ctx.request.url);



        //console.log(ctx.app.config.keys.split('_')[1]);

        // 拿到key
        const key = ctx.app.config.keys.split('_')[1];

        // 如果没有设置token，返回
        if (!token) {
            ctx.status = 401;
            ctx.body = 'token 不存在';
            return
        }

        try {

            // 根据token解析出用户id
            const { id } = jwt.verify(token, key);

            // 解析token错误，返回
            if (!id) {
                ctx.status = 401;
                ctx.body = 'token 错误';
                return
            }

            // 根据解析出来的id，获取用户
            const user = await User.findById(id);

            // 找不到用户，返回
            if (!user) {
                ctx.status = 401;
                ctx.body = 'token 错误 , 用户不存在';
                return
            }

        } catch (e) {            // 出错，返回
            ctx.status = 401;
            ctx.body = 'jwt token error，解析token错误'
        }


         await next()
    }

}