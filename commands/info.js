const Discord = require('discord.js');
const notreg = require('../function/notreg.js');

module.exports.run = async (bot, message, args, db) => {
    message.delete().catch(error =>message.reply("Ошибка"));

    let id = message.author.id;
    let idbd = `'`+id+`'`;

    //Поиск игрока по id что бы получить всю информацию из бд
    let sql = `SELECT * FROM users WHERE id_user = ${idbd}`;
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err.message);
        }

        if(result.id_user == undefined) notreg(message); //Игрок не зарегестрирован
        else{
        //Поиск названия фракции по fraction_id игрока
        //let sql = `SELECT * FROM fractions WHERE fraction_id = ${result.fraction_id}`;
        //db.query(sql, (err, result2) => {
            //if (err) {
                //console.error(err.message);
            //}

                //Список информации о игроке
                let taggedUser = message.mentions.users.first() || message.author;
                let embed = new Discord.RichEmbed()
                .setAuthor(`${result.name_user}`)
                .setColor("#15f153")
                .setThumbnail(taggedUser.displayAvatarURL)
                .addField(`Уровень`, `${result.lvl}`)
                .addField(`Баланс`, `${result.money}$`)
                .addField(`Локация`, `${result.location}`)
                //.addField(`Фракция`, `${result2.fraction_name}`)

                message.author.send(embed);
        //});
        }
    });
}
module.exports.help = {
    name: "info"
}