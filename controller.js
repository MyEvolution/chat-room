'use strict';

function getRouter()
{
var router = require("koa-router")();

var fs = require("fs");

var files = fs.readdirSync("./control");
var files = files.filter(x=>x.endsWith('.js'));
//console.log(files);
for( var i of files)//the dfferences between of and in
{
    console.log("control:"+i+"...");
   var abc = require("./control/"+i);
  // console.log(abc);
    for(var j in abc)
       if(j.startsWith("GET "))
       {
           //console.log(typeof(j));
           router.get(j.substring(4),abc[j]);
           console.log("register: "+j);
       }
       else if(j.startsWith("POST "))
       {
           router.post(j.substring(5),abc[j]);
           console.log("register: "+j);
       }
       else {console.log("ignore:"+j)};
}
return router;
}

module.exports = getRouter;