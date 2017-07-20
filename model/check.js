const Sequelize = require("sequelize");

const config = require("./config.js");

var sequelize = new Sequelize(config.database,config.username,config.password,{
    host:config.host,
    dialect:'mysql',
    pool:
    {
        max:5,
        min:0,
        idle:30000
    }    
});
var user = sequelize.define('user_inf', {
    name: Sequelize.STRING,
    password: Sequelize.STRING,
    avatar:Sequelize.STRING
}, {
        timestamps: false,
        freezeTableName:true,
        tableName:'user_inf'
    });

var check = async (username,password)=> {
    
  var inf = await user.find({where:{name:username}});
  //console.log(inf);
  if(inf && inf.password === password)
    return inf.avatar;
    return null;
};
//console.log(check("My Evolution","zgq19961001"));
module.exports = check;