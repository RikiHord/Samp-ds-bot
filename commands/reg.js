const Discord = require('discord.js');
const findDB = require('../function/findDB');
const fs = require('fs');

module.exports.run = async (bot, message, args) => {
    message.delete().catch(error =>message.reply("Ошибка"));

    if(!message.member.roles.some(r=>["Не зарегистрирован"].includes(r.name)) )
    return message.author.send("**Эту команду могут использивать только новые учасники.** Если вы не были ранее зарегистрированы и у вас не сработала команда обратитесь в текстовый канал тех.поддежки!");

    var named = args[0];
    for(var i = 1; i < args.length; i++){
        named = named + " " + args[i];
    };

    let id = message.author.id;

    if(!named){ 
        return message.channel.send("Введи имя!");
    }
    else{
        let name = "'" + named + "'";
        findDB(id, name, message, named);
    }
}
module.exports.help = {
    name: "reg"
  }