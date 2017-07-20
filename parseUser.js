'use strict';
const Cookies = require('cookies');
function parserUser(obj)
{
    if(!obj)
    return;
   //console.log("try parser:",obj);
    var s;
    var avatar;
   if(obj.headers)
    {
        let cookie = new Cookies(obj,null);
        
        s = cookie.get('myevolutionUsername');
		//console.log("cookies:",s);
        avatar = cookie.get('avatar');
    return [s,avatar];
    }
    return obj;

}

module.exports = parserUser;