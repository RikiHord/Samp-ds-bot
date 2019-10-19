const Discord = require('discord.js');
const notreg = require('../function/notreg.js');

module.exports.run = async (bot, message, args, db) => {
    message.delete().catch(error =>message.reply("Ошибка"));

    let id = message.author.id;

    //Поиск имени и количества денег игрока
    let sql = `SELECT id_user, name_user, money FROM users WHERE id_user = ${id}`;
        db.get(sql, (err, result) => {
            if (err) {
                console.error(err.message);
            }
        
        if(result == undefined){
            notreg(); //Игрок не зарегестрирован
        }
        else{
            if(+(result.money) < 100){
                //Не хватает денег
                return message.author.send(`Вам не хватает средств. Для подачи рекламы вам нужно 100$`);
            }
            else{
                //Хватает но нету сообщения
                let sayMessage = args.join(" ");
                if(args[0] == undefined){
                    return message.author.send(`Вы забили написать что-то!`);
                }
                else{
                    //Отправка сообщения
                    let adschannel = message.guild.channels.find(`name`, "📻радио");
                    let newmoney = +(result.money) - 100;
                    
                    //Списывание 100$
                    sql = `UPDATE users SET money = ${newmoney} WHERE id_user = ${id}`;
                    db.get(sql, (err) => {
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