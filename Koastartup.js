'use strict';

const Koa = require("koa");
const app = new Koa();
const parser = require("koa-bodyparser");
const router = require("./controller.js")();
const templating = require("./templating.js");


app.use(async (ctx,next)=>{//登上网站时候打印的信息
    //console.log(ctx.request);
    await next();
});
app.use(parser());//解析post请求
app.use(templating("./view",{noCache:false,watch:false}));//安装模板
app.use(router.routes());//处理请求

module.exports = app;