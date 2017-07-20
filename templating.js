'use strict';

const nunjucks = require("nunjucks");

function createEnv(path,ops)
{
    var autoescape = ops.autoescape === undefined ? true : ops.autoescape,
    noCache = ops.noCache||false,
    watch = ops.watch||false,
    throwOnUndefined = ops.throwOnUndefined||false;
    var env = new nunjucks.Environment(
        new nunjucks.FileSystemLoader(path||"view",{
        noCache:noCache,
        watch:watch
    }),{
        autoescape:autoescape,
        throwOnUndefined:throwOnUndefined
    });
    if(ops.filters)
    {
        for (var f in ops.filters)
          env.addFilter(f,ops.filters[f]);
    }
    return env;
}
function templating(path,ops)
{
    var env = createEnv(path,ops);
    return async(ctx,next)=>{
    ctx.render = function(view,model)
    {
     ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
     ctx.response.type = "text/html";
    }
    await next();
    };
}

module.exports = templating;