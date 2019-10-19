const Discord = require('discord.js');
const notreg = require('../function/notreg.js');

module.exports.run = async (bot, message, args, db) => {
    message.delete().catch(error =>message.reply("Ошибка"));

    let id = message.author.id;

    let sql = `SELECT * FROM users WHERE id_user = ${`'`+id+`'`}`;
    db.get(sql, (err, result) => {
    if (err) {
        console.error(err.message);
    }

    if(result == undefined){
        notreg(message);
    }
    else{
        if(result.fraction_id == 0){
            return message.author.send("Вы не состоите в фракции что-бы использовать фракционые команды");
        }
        else{
            let sql = '';
            let iduser = `'`+result.id_user+`'`;
            switch (result.fraction_id) {
                case 1:
                    sql = `SELECT * FROM Rifa WHERE id_user = ${iduser}`
                    break;
                case 2:
                    sql = `SELECT * FROM Grove_Street WHERE id_user = ${iduser}`;
                    break;
                case 3:
                    sql = `SELECT * FROM The_Ballas WHERE id_user = ${iduser}`;
                    break;
                case 4:
                    sql = `SELECT * FROM Vagos WHERE id_user = ${iduser}`;
                    break;
                case 5:
                    sql = `SELECT * FROM Aztecas WHERE id_user = ${iduser}`;
                    break;
            }
                db.get(sql, (err, result2) => {
                if (err) {
                    console.error(err.message);
                }

                if(result2.boss == 0){
                    return message.author.send("Вы не являетесь главою фракции");
                }
                else{
                    let newgangmember = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
                    if(newgangmember == undefined){
                        return message.author.send(`Укажите человека которого хотите добавить в банду`);
                    }
                    else if(newgangmember.id == id){
                        return message.author.send(`Вы и так в банде`);
                    }
                    else{
                        let sql = `SELECT * FROM users WHERE id_user = ${`'`+newgangmember.id+`'`}`;
                        db.query(sql, (err, result3) => {
                        if (err) {
                            console.error(err.message);
                        }

                        if(result3 == undefined){
                            return message.author.send("Мы не нашли такого человека");
                        }
                        else{
                            if(result3.fraction_id != 0){
                                return message.author.send("Игрок уже состоит в банде!");
                            }
                            else{
                            let gRole = '';
                            let sql2 = '';
                            let num = 0;
                            let name = "'" + result3.name_user + "'";
                            switch (result.fraction_id) {
                                case 1:
                                    num = 1;
                                    sql = `INSERT INTO Rifa VALUES (` + [`'`+result3.id_user+`'`, name, 0].join(',') + `)`;
                                    gRole = message.guild.roles.find(`name`, 'Rifa');
                                    sql2 = `UPDATE users SET fraction_id = ${num} WHERE id_user = ${`'`+newgangmember.id+`'`}`;
                                    break;
                                case 2:
                                    num = 2;
                                    sql = `INSERT INTO Grove_Street VALUES (` + [`'`+result3.id_user+`'`, name, 0].join(',') + `)`;
                                    gRole = message.guild.roles.find(`name`, 'Grove Street');
                                    sql2 = `UPDATE users SET fraction_id = ${num} WHERE id_user = ${`'`+newgangmember.id+`'`}`;
                                    break;
                                case 3:
                                    num = 3;
                                    sql = `INSERT INTO The_Ballas VALUES (` + [`'`+result3.id_user+`'`, name, 0].join(',') + `)`;
                                    gRole = message.guild.roles.find(`name`, 'The Ballas');
                                    sql2 = `UPDATE users SET fraction_id = ${num} WHERE id_user = ${`'`+newgangmember.id+`'`}`;
                                    break;
                                case 4:
                                    num = 4;
                                    sql = `INSERT INTO Vagos VALUES (` + [`'`+result3.id_user+`'`, name, 0].join(',') + `)`;
                                    gRole = message.guild.roles.find(`name`, 'Vagos');
                                    sql2 = `UPDATE users SET fraction_id = ${num} WHERE id_user = ${`'`+newgangmember.id+`'`}`;
                                    break;
                                case 5:
                                    num = 5;
                                    sql = `INSERT INTO Aztecas VALUES (` + [`'`+result3.id_user+`'`, name, 0].join(',') + `)`;
                                    gRole = message.guild.roles.find(`name`, 'Aztecas');
                                    sql2 = `UPDATE users SET fraction_id = ${num} WHERE id_user = ${`'`+newgangmember.id+`'`}`;
                                    break;
                            }
                            db.get(sql, (err) => {
                            if (err) 
                                return console.error(err.message);
                                newgangmember.addRole(gRole.id);
                                return message.channel.send(`Поздравляем ${newgangmember}. Вы вступили в банду`);
                            });
                            db.get(sql2, (err) => {
                                if (err) 
                                    return console.error(err.message);
                                });
                        }
                        }
                        });
                    }
                }
                });
        }
    }
    });
}
module.exports.help = {
    name: "invitegang"
}