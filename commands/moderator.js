const Discord = require('discord.js');
const noreg = require('../function/notreg');
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

    if(result == undefined){
        notreg();
    }
    else{
        var member = message.mentions.members.first() || message.guild.members.get(id);
        var glavmoderator = message.guild.roles.find(`name`, `Глав. Модератор`);
        var moderator = message.guild.roles.find(`name`, `Модератор`);

        if(result.moderator == 0){
            return message.author.send(`Вы не являетесь модератором сервера`);
        }
        else{
            if(message.member.roles.some(r=>["Глав. Модератор"].includes(r.name))){
                member.removeRole(glavmoderator.id);
            }
            else if(message.member.roles.some(r=>["Модератор"].includes(r.name))){
                member.removeRole(moderator.id);
            }
            else{
                if(result.moderator == 1){
                    member.addRole(moderator.id);
                }
                else{
                    member.addRole(glavmoderator.id);
                }
            }
            
        }
    }
    });
}
module.exports.help = {
    name: "moderator"
}