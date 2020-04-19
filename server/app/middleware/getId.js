//const inflection = require('inflection');

module.exports = options => {
    return async (ctx, next) => {

        // 取得 id
        const id = ctx.params.id;

        // 赋予资源 id
        ctx.resource_id = id;

        await next();
    }
}