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

    let money = +args[0];
    var recipient = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));;
    if(!recipient){ 
        return message.channel.send("Введи имя получателя!");
    }
    else{
        var id = message.author.id;

        let sql = `SELECT id_user, name_user, money FROM users WHERE id_user = ${id}`;
        db.get(sql, (err, result) => {
            if (err) {
                console.error(err.message);
            }
            
            if(result == undefined){
                notreg();
            }
            else{
                if(result.money < money){
                    return message.author.send("Недостаточно денег!");
                }
                else{
                    let sql = `SELECT id_user, name_user, money FROM users WHERE id_user = ${recipient.id}`;
                    db.get(sql, (err, result2) => {
                    if (err) {
                        console.error(err.message);
                    }
                    
                    if(result2 == undefined){
                        return message.author.send("Игрок не найден, проверьте правильность написания имени");
                    }
                    else{
                        let sql = `UPDATE users SET money = ${result.money - money} WHERE id_user = ${id}`;
                        db.get(sql, (err) => {
                            if (err) {
                                console.error(err.message);
                            }
                            return message.author.send(`Вы передали ${money}$ игроку: ${result2.name_user}`);
                        });
                        let recipientname = "'" + result2.name_user + "'";
                        let newmoney = result2.money + money;
                        sql = `UPDATE users SET money = ${newmoney} WHERE name_user = ${recipientname}`;
                        db.get(sql, (err) => {
                            if (err) {
                                console.error(err.message);
                            }
                            return message.channel.send(`${result2.name_user} вы получили ${money}$ от ${result.name_user}`);
                        });
                    }
                });
                }
            }
        });
    }
}
module.exports.help = {
    name: "pay"
  }