var check = require("../model/check.js");
var parseUser = require("../parseUser.js");
var get = async(ctx,next)=>{
    /**读取cookie */
    var username = parseUser([ctx.cookies.get('myevolutionUsername'),ctx.cookies.get("avatar")]||[]);
    //console.log("Parser down!",username);
	var userAgent = ctx.request.headers['user-agent'].toLowerCase();
	if(userAgent.indexOf('mobile') === -1)
	{	
    if(username[0]&&username[0]!=='')
    ctx.render("chatRoom.html",{name:username[0],avatar:username[1]});
    else ctx.render("signIn.html");
	}
	else
	{
    if(username[0]&&username[0]!=='')
    ctx.render("mchatRoom.html",{name:username[0],avatar:username[1]});
    else ctx.render("msignIn.html");	
	}
}


var post = async(ctx,next)=>
{
    var username = ctx.request.body.username;
    var password = ctx.request.body.password;
	var userAgent = ctx.request.headers['user-agent'].toLowerCase();
 //console.log("control:",username,password);
    var result = await check(username,password);
    //console.log("result",result);
    if(result)
    {
        /**写入cookie */
        ctx.cookies.set('myevolutionUsername',username);
        ctx.cookies.set('avatar',result);
		if(userAgent.indexOf('mobile') === -1)
    ctx.render("chatRoom.html",{name:username,avatar:result});
else ctx.render("mchatRoom.html",{name:username,avatar:result});
    }
    else
    {
			if(userAgent.indexOf('mobile') === -1)
    ctx.render("signfail.html");
 else ctx.render('mfailsignin.html');
    }
}

module.exports = {
    "GET /":get,
    "POST /signin/":post
}