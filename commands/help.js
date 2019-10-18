const Discord = require("discord.js");

module.exports.run = async (mybot, message, args) => {

    let botembed = new Discord.RichEmbed()
    .setAuthor('Основные команды')
    .setColor("#15f153")
    .addField("Команды пользывателей", "botinfo - краткая информация о боте\n leave - покинуть голосовой канал(бот)\n play - Заказать музику (ссылка)\n report - обнаружили нарушение, сообщите администрации\n say - бот скажет то что вы пожелаете!\n saye - бот скажет сообщение всем на сервере\n search - Заказать музыку (Ключевые слова)\n serverinfo - краткая информация о сервере")
    .addField("Команды администрации", "addrole - Выдать/Добавить роль\n ban - Выдать бан пользивателю\n clear - Отчистить сообщения в чате\n kick - кикнуть учасника\n mute - Замутить пользывателя\n removerole - Убрать роль у пользивателя");

    message.delete().catch(error =>message.reply("Ошибка"));
    return message.author.send(botembed);
}

module.exports.help = {
  name: "help"
}
