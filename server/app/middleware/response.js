// 捕捉执行过程中的错误，确定返回状态码

module.exports = options => {
    return async (ctx, next) => {

        //console.log('response中间件执行了')

        try {
            await next()
        } catch (e) {
            // 捕捉到错误，返回
            ctx.body = '服务器错误';
            ctx.status = 500;
            return
        }

        // 如果body有，则200
        if (ctx.body) {
            ctx.status = 200;
            return
        };

        ctx.status = 404;
    }
}