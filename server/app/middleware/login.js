// 处理登录请求返回的中间件

module.exports = options => {
    return async (ctx, next) => {
        try {
            await next()
        } catch (e) {
            ctx.body = '服务器错误';
            ctx.status = 500;
        };


        if (ctx.token) {
            console.log(ctx.token);

            // 设置cookies
            ctx.cookies.set('user_token', ctx.token, {
                maxAge: 24 * 3600 * 1000,
                httpOnly: true,
                encrypt: true
            });

            ctx.status = 200;
            return
        };


        ctx.status = 500;
    }
}