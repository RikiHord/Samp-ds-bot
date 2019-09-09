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

    let sql = `SELECT id_user, name_user, money FROM users WHERE id_user = ${id}`;
        db.get(sql, (err, result) => {
            if (err) {
                console.error(err.message);
            }
        
        if(result == undefined){
            notreg();
        }
        else{
            if(+(result.money) < 100){
                return message.author.send(`Вам не хватает средств. Для подачи рекламы вам нужно 100$`);
            }
            else{
                let sayMessage = args.join(" ");
                if(args[0] == undefined){
                    return message.author.send(`Вы забили написать что-то!`);
                }
                else{
                    let adschannel = message.guild.channels.find(`name`, "📻радио");
                    let newmoney = +(result.money) - 100;
                    
                    sql = `UPDATE users SET money = ${newmoney} WHERE id_user = ${id}`;
                    db.get(sql, (err, result2) => {
                        if (err) {
                            console.error(err.message);
                        }
                        adschannel.send(`\`\`\`css
Реклама от ${result.name_user}: ${sayMessage}\`\`\``);
                    });
                }
            }
        }
        });
}
module.exports.help = {
    name: "ads"
}