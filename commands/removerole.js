const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    message.delete().catch();
  
    if(!message.member.roles.some(r=>["Админ"].includes(r.name)))
    return message.reply("Извини, но твоих прав не достаточно чтобы использивать это.");
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
  if(!member)
    return message.reply("Этого пользывателя нет на нашем сервере.");

  let role = args.slice(1).join(' ');
  if(!role) return message.reply("Введите название роли!");
  let gRole = message.guild.roles.find(`name`, role);
    if(!member.roles.has(gRole.id)) return message.reply("У пользывателя нет даной роли");
    try{
        await member.send("К сожалению вы потеряли роль: " + gRole.name + ". На сервере: " + message.guild.name)
      }catch(e){
        message.channel.send(`Я не смог написать поздравление в личние сообщения`)
      }
    await(member.removeRole(gRole.id));
  }
  
  module.exports.help = {
    name: "removerole"
  }