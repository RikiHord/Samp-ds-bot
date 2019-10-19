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
        if(!message.member.roles.some(r=>["Полиция"].includes(r.name)) )
        return message.author.send("Ваших полномочий не хватает что бы арестовать человека!")
        else{
            let toprison = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            if(toprison == undefined){
                return message.author.send(`Укажите человека которого хотите арестовать`);
            }
            else if(toprison.id == id){
                return message.author.send(`Вы не можете арестовать себя`);
            }
            else{
                let sql = `SELECT * FROM users WHERE id_user = ${toprison.id}`;
                db.get(sql, (err, result2) => {
                if (err) {
                    console.error(err.message);
                }

                if(result2 == undefined){
                    return message.author.send("Мы не нашли такого человека");
                }
                else{
                    let dataRole = message.guild.roles.find(`name`, `${result2.location}`);
                    toprison.removeRole(dataRole.id);
                    gRole = message.guild.roles.find(`name`, `Заключеный`);
                    toprison.addRole(gRole.id);
                    setTimeout(function(){
                        toprison.addRole(dataRole.id);
                        toprison.removeRole(gRole.id);
                    }, 600000);
                }
            });
            }
        }
    }
    });
}
module.exports.help = {
    name: "arest"
}