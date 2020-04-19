// 引入inflection
const inflection = require('inflection')

module.exports = options => {
    return async (ctx, next) => {

        //console.log(ctx.params);

        // 从 params 的 resource 中获取要操作的model
        const modelName = inflection.classify(ctx.params.resource);

        // 绑定要操作的 Model
        ctx.Model = require(`../models/${modelName}`);

        await next()
    }
}