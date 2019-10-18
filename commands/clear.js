const Discord = require("discord.js");

module.exports.run = async (mybot, message, args) => {

    if(!message.member.roles.some(r=>["Админ"].includes(r.name)) )
    return message.reply("Извини, но твоих прав не достаточно чтобы использивать это.");
  const deleteCount = parseInt(args[0], 10);
  if(!deleteCount || deleteCount < 2 || deleteCount > 100)
    return message.reply("Для удаления введи число от 2 до 100.");
  const fetched = await message.channel.fetchMessages({limit: deleteCount});
  message.channel.bulkDelete(fetched)
    .catch(error => message.reply(`Couldn't delete messages because of: ошибка `));

}

module.exports.help = {
  name: "clear"
}