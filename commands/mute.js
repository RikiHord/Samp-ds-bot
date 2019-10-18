const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (mybot, message, args) => {

    if(!message.member.roles.some(r=>["Админ"].includes(r.name)) )
    return message.reply("Извини, но твоих прав не достаточно чтобы использивать это.");
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
    return message.reply("Этого пользывателя нет на нашем сервере.");
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tomute) return message.reply("Єтот пользиватель не может быть замучен.");
    if(tomute.mutenable) 
      return message.reply("Я не могу эго замутить у него слишком много прав.");
  let muterole = message.guild.roles.find(`name`, "Замучен");
  
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Замучен",
        color: "#020202",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("Введи время мута");

  await(tomute.addRole(muterole.id));
  message.channel.send(member.user + " был замучен на " + ms(ms(mutetime)), { long: true });

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(member.user + " размучен. Не нарушай больше)");
  }, ms(mutetime));

}

module.exports.help = {
  name: "mute"
}