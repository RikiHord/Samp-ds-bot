const Discord = require('discord.js');
const notreg = require('../function/notreg.js');

module.exports.run = async (bot, message, args, db) => {
    message.delete().catch(error =>message.reply("Ошибка"));

    let id = message.author.id;

    //Поиск игрока по id что бы получить всю информацию из бд
    let sql = `SELECT * FROM users WHERE id_user = ${id}`;
    db.get(sql, (err, result) => {
        if (err) {
            console.error(err.message);
        }

        if(result == undefined) notreg(); //Игрок не зарегестрирован
        //Поиск названия фракции по fraction_id игрока
        let sql = `SELECT * FROM fractions WHERE fraction_id = ${result.fraction_id}`;
        db.get(sql, (err, result2) => {
            if (err) {
                console.error(err.message);
            }

                //Список информации о игроке
                let taggedUser = message.mentions.users.first() || message.author;
                let embed = new Discord.RichEmbed()
                .setAuthor(`${result.name_user}`)
                .setColor("#15f153")
                .setThumbnail(taggedUser.displayAvatarURL)
                .addField(`Уровень`, `${result.lvl}`)
                .addField(`Баланс`, `${result.money}$`)
                .addField(`Локация`, `${result.location}`)
                .addField(`Фракция`, `${result2.fraction_name}`)

                message.author.send(embed);
        });
    });
}
module.exports.help = {
    name: "info"
}