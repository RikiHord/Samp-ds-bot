const Discord = require('discord.js');
const notreg = require('../function/notreg.js');

module.exports.run = async (bot, message, args, db) => {
    message.delete().catch(error =>message.reply("Ошибка"));

    let id = message.author.id;

    let sql = `SELECT * FROM users WHERE id_user = ${id}`;
    db.get(sql, (err, result) => {
    if (err) {
        console.error(err.message);
    }

    if(result == undefined){
        notreg(message);
    }
    else{
        let embed = new Discord.RichEmbed()
            .setAuthor(`--==(Игровые локации)==--`)
            .setColor("#cfe400")
            .addField(`Рабочие локации`, `Ферма, Завод, Шахта`)
            .addField(`Другие локации`, `Мэрия, Вокзал`)
            .setFooter(`Воспользуйтесь командой ++go <локация>, что бы отправится в локацию`)

        message.author.send(embed);
    }
    });
}
module.exports.help = {
    name: "gps"
}