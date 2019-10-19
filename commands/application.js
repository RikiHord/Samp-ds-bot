const Discord = require('discord.js');
const notreg = require('../function/notreg.js');

module.exports.run = async (bot, message, args, db) => {
    message.delete().catch(error =>message.reply("Ошибка"));
    const newschannel = message.guild.channels.find(`name`, "📻радио");

    let id = message.author.id;

    let sql = `SELECT id_user, name_user, money FROM users WHERE id_user = ${id}`;
        db.get(sql, (err, result) => {
            if (err) {
                console.error(err.message);
            }
        
        if(result == undefined){
            notreg(message);
        }
        else{
            sql = `SELECT election FROM settings`;
            db.query(sql, (err, result2) => {
                if (err) {
                    console.error(err.message);
                }
            
            if(result2 == undefined){
                message.author.send(`Сейчас не время выборов!`);
            }
            else{
                sql = `SELECT * FROM candidates WHERE id_user = ${id}`;
                    db.get(sql, (err, result3) => {
                        if (err) {
                            console.error(err.message);
                        }
                        
                        if(result3 != undefined){ return message.author.send(`Вы уже записали свою кандидатуру!`);}
                if(result.money < 5000){
                    message.author.send(`У вас не хватает денег нужно 5000$`);
                }
                else{
                    sql = `SELECT COUNT(*) AS count FROM candidates`;
                    db.get(sql, (err, result4) => {
                        if (err) {
                            console.error(err.message);
                        }
                        
                    if(result4.count < 5){
                    let newmoney = +(result.money) - 5000;
                    sql = `UPDATE users SET money = ${newmoney} WHERE id_user = ${id}`;
                    db.get(sql, (err, result) => {
                        if (err) {
                            console.error(err.message);
                        }
                    });
                    let name = `'`+result.name_user+`'`;
                    let ids = `'`+id+`'`;
                    sql = `INSERT INTO candidates VALUES (${ids} , ${name})`;
                    db.get(sql, (err, result) => {
                        if (err) {
                            console.error(err.message);
                        }
                        newschannel.send(`**${result.name_user}** новый кандидат в меры города!`);
                    });
                    }
                    else{
                        message.author.send(`Слишком много кандидатов. В следующий раз вам повезет!`);
                    }
                });  
                }    
            });
            }  
        
        });
    }
    });
}
module.exports.help = {
    name: "application"
}