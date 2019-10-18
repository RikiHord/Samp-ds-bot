const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setAuthor("Информация о сервере")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Имя сервера", message.guild.name)
    .addField("Количество учасников", message.guild.memberCount);

    message.delete().catch(error =>message.reply("Ошибка"));
    message.author.send(serverembed);
}

module.exports.help = {
  name:"serverinfo"
}