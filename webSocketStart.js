'use strict';
//cookie name myevolutionUsername
const websocket = require("ws");
const parseUser = require("./parseUser.js"); 
const Websocketserver = websocket.Server;
function createMessage(type,username,avatar,content)
{
    var a = {type:type,username:username,avatar:avatar,content:content};
    
    return a;
}
function socketStart(server){
const wss = new Websocketserver({server:server});

wss.broadcast = function (data,ws) {//广播信息
    wss.clients.forEach(function (client) {
        try{
            if(client!==ws)
        client.send(data);
    }catch(e)
    {/*ignore*/}
    });
};
    var client = {};
	//var clientNum = {};
wss.on('connection',function(ws){
    console.log("get connection!");
	ws.wss = wss;
     let user = parseUser(ws.upgradeReq);
	 ws.on('message',function(message){
console.log("server receive:",message);
if(ws.user)
   ws.wss.broadcast(JSON.stringify(createMessage("message",ws.user,ws.avatar,message)),ws);
else 
{
	var obj;
	try{
	obj = JSON.parse(message);
	}catch(e){console.log(e);return;}
	ws.user =obj.name;
	ws.avatar = obj.avatar;
	if(client[ws.user])
	{
		ws.dub=1;
		ws.close();
		console.log("重复登录！");
		return;
	}
	 else {
	    client[ws.user] = ws.avatar;
	    try{
    var jstring = JSON.stringify(createMessage("inlet",ws.user,ws.avatar));
	//console.log(jstring);
    wss.broadcast(jstring);
//client.add(user[0]);
    wss.broadcast(JSON.stringify(client));
		}catch(e){}
	
	 }}});
     if(!user[0])
        {
             ws.send(JSON.stringify(createMessage('sendInf')));
            // console.log("Close the connection!No cookie be found!");
        }
		else{
			//console.log(user[0]);
	   ws.user = user[0];
    ws.avatar=user[1];
	
	if(client[user[0]])
	{
		ws.dub = 1;
		ws.close();
		console.log("重复登录！");
		return ;
	}
	 else 
	    client[user[0]] = user[1];

	try{
    var jstring = JSON.stringify(createMessage("inlet",ws.user,ws.avatar));
    wss.broadcast(jstring);
//client.add(user[0]);
    wss.broadcast(JSON.stringify(client));
}catch(e){}}
   
    ws.on('close',function(evt){
	if(ws.dub!==1){
        delete client[ws.user];
       // client.delete(ws.user);
	   //console.log(client);
     ws.wss.broadcast(JSON.stringify(client));
	  ws.wss.broadcast(JSON.stringify(createMessage("left",ws.user,ws.avatar)));
    }});
});
}

module.exports = socketStart;