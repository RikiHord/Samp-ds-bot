const Discord = require("discord.js");

module.exports.run = async (mybot, message, args) => {

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Этого пользывателя нет на нашем сервере.");
      let reason = args.slice(1).join(' ');

    let reportEmbed = new Discord.RichEmbed()
    .setAuthor("Репорт")
    .setColor("#ffa300")
    .addField("Нарушитель", member + " ID: " + member.id)
    .addField("Зарепортил", message.author + " ID: " + message.author.id)
    .addField("Канал где было обнаруженно нарушение: ", message.channel)
    .addField("Причина: ", reason);

    let reportschannel = message.guild.channels.find(`name`, "admin-room");
    if(!reportschannel) return message.channel.send("Текстовый канал не найден! (Проверьте правильность написания или присутствие текстового канала '" + reportchannel + " ')");

    message.delete().catch(error =>message.reply("Ошибка"));
    reportschannel.send(reportEmbed);

  return;
}

module.exports.help = {
  name: "report"
}