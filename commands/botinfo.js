const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setAuthor(bot.user.username)
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Версия", "2.15.0")
    .addField("Последнее обновление", "03.05.2019")
    .addField("Владелец", "MrWoOolf#8242")

    message.delete().catch(error =>message.reply("Ошибка"));
    message.author.send(botembed);
}

module.exports.help = {
  name:"botinfo"
}