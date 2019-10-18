const Discord = require("discord.js");

module.exports.run = async (mybot, message, args) => {

    if(!message.member.roles.some(r=>["Админ"].includes(r.name)) )
    return message.reply("Извини, но твоих прав не достаточно чтобы использивать это.");
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Этого пользывателя нет на нашем сервере.");
    if(!member.kickable) 
      return message.reply("Я не могу эго кикнуть у него слишком много прав.");
      let reason = args.slice(1).join(' ');
      if(!reason) reason = "Я не буду кикать без причины!";

      let kickEmbed = new Discord.RichEmbed()
      .setAuthor("Кик с сервера")
      .setColor("#ff0000")
      .addField("Нарушитель", member + " ID: " + member.id)
      .addField("Кикнул", message.author + " ID: " + message.author.id)
      .addField("Причина: ", reason);
  
      let kickchannel = message.guild.channels.find(`name`, "admin-room");
      if(!kickchannel) return message.channel.send("Текстовый канал не найден! (Проверьте правильность написания или присутствие текстового канала '" + kickchannel + " ')");

      kickchannel.send(kickEmbed);

      await member.send(kickEmbed);

      await member.kick(reason)
      .catch(error => message.reply('Извини,' + message.author + ', но здесь ошибочка:' + error));
      message.delete().catch(error =>message.reply("Ошибка"));
    message.channel.send(member.user + ', был кикнут, ' + message.author +'-ом, по причине: ' + reason);
}

module.exports.help = {
  name: "kick"
}