const Discord = require("discord.js");

module.exports.run = async (mybot, message, args) => {

    if(!message.member.roles.some(r=>["Админ"].includes(r.name)) )
    return message.reply("Извини, но твоих прав не достаточно чтобы использивать это.");
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
  if(!member)
    return message.reply("Этого пользывателя нет на нашем сервере.");
  if(!member.bannable) 
    return message.reply("Я не могу его забанить, у него слишком много прав.");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Введите причину бана!";

    let banEmbed = new Discord.RichEmbed()
    .setAuthor("Бан")
    .setColor("#ff0000")
    .addField("Нарушитель", member + " ID: " + member.id)
    .addField("Забанил", message.author + " ID: " + message.author.id)
    .addField("Причина: ", reason);

    let banchannel = message.guild.channels.find(`name`, "admin-room");
    if(!banchannel) return message.channel.send("Текстовый канал не найден! (Проверьте правильность написания или присутствие текстового канала '" + banchannel + " ')");
  
    banchannel.send(banEmbed);

    await member.send(banEmbed);

    await member.ban(reason)
    .catch(error => message.reply('Извини,' + message.author + ', но здесь ошибочка:' + error));
    message.delete().catch(error =>message.reply("Ошибка"));
  message.channel.send(member.user + ', был забанин, ' + message.author +'-ом, по причине: ' +reason);
}

module.exports.help = {
  name: "ban"
}