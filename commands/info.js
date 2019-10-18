const Discord = require('discord.js');
const notreg = require('../function/notreg.js');
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./sqlite/sads.db', (err)=>{
    if(err){
      console.log(error.message);
    }
});

module.exports.run = async (bot, message, args) => {
    message.delete().catch(error =>message.reply("Ошибка"));

    let id = message.author.id;

    let sql = `SELECT * FROM users WHERE id_user = ${id}`;
    db.get(sql, (err, result) => {
    if (err) {
        console.error(err.message);
    }

    let sql = `SELECT * FROM fractions WHERE fraction_id = ${result.fraction_id}`;
    db.get(sql, (err, result2) => {
    if (err) {
        console.error(err.message);
    }

    if(result == undefined){
        notreg();
    }
    else{
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
    }
    });
    });

}
module.exports.help = {
    name: "info"
  }