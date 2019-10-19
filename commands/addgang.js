const Discord = require('discord.js');
const notreg = require('../function/notreg.js');

module.exports.run = async (bot, message, args, db) => {
    message.delete().catch(error =>message.reply("Ошибка"));

    let id = message.author.id;

    //Поиск имени и айди фракции игрока
    let sql = `SELECT id_user, name_user, fraction_id FROM users WHERE id_user = ${id}`;
        db.get(sql, (err, result) => {
            if (err) {
                console.error(err.message);
            }
        if(result == undefined){
            notreg(message); //Игрок не зарегестрирован
        }
        else{
            //Проверка идут ли сейчас выборы
            sql = `SELECT election FROM settings`;
            db.get(sql, (err, result2) => {
                if (err) {
                    console.error(err.message);
                }
            
            if(result2 == undefined){
                message.author.send(`Сейчас не время выборов!`); //Не идут выборы
            }
            else{
                let tableName = ``;
                let newsCName = ``;
                let boolFraction = 1;
                switch (result.fraction_id) {
                    case 1:
                        tableName = `candRifa`;
                        newsCName = `rifa`;
                        break;
                    case 2:
                        tableName = `candGroveStreet`;
                        newsCName = `grove-street`;
                        break;
                    case 3:
                        tableName = `candTheBallas`;
                        newsCName = `the-ballas`;
                        break;
                    case 4:
                        tableName = `candVagos`;
                        newsCName = `vagos`;
                        break;
                    case 5:
                        tableName = `candAztecas`;
                        newsCName = `aztecas`;
                        break;
                    default:
                        boolFraction = 0;
                        break;
                }
                var newschannel = message.guild.channels.find(`name`, newsCName);
                if(boolFraction){
                    //Поиск игрока в кандидатах на выборы
                    sql = `SELECT * FROM ${tableName} WHERE id_user = ${id}`;
                    db.get(sql, (err, result3) => {
                        if (err) {
                            console.error(err.message);
                        }
                        
                        if(result3 != undefined){ return message.author.send(`Вы уже участвуете!`);}
                        else{
                            //Количество кандидатов (максимум 5)
                            sql = `SELECT COUNT(*) AS count FROM candidates`;
                            db.get(sql, (err, result4) => {
                                if (err) {
                                    console.error(err.message);
                                }
                            
                            if(result4.count < 5){
                            let name = `'`+result.name_user+`'`;
                            let ids = `'`+id+`'`;
                            //Запись нового кандидата
                            sql = `INSERT INTO ${tableName} VALUES (${ids} , ${name})`;
                                db.get(sql, (err, result5) => {
                                    if (err) {
                                        console.error(err.message);
                                }
                            newschannel.send(`**${result.name_user}** кинул вызов текущему главе!`);
                            });
                            }
                            else{
                                message.author.send(`Слишком много желающих. В следующий раз вам повезет!`);
                            }
                            });  
                        }    
                    });
                }
                else{
                    message.author.send(`Вы не состоите не в одной банде!`);
                }               
            }
        });
    }
});
}
module.exports.help = {
    name: "application"
}