const Discord = require('discord.js');
const notreg = require('../function/notreg.js');

module.exports.run = async (bot, message, args, db) => {
    message.delete().catch(error =>message.reply("Ошибка"));
    
    let id = message.author.id;
    let nameleave = args[0];
    if(nameleave != undefined){
        let leavegangmember = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        id = leavegangmember.id;
    }

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
            return message.author.send("Вы не состоите в банде");
        }
        else{
            let sql1 = '';
            let sql2 = '';
            let iduser = `'`+result.id_user+`'`;
            switch (result.fraction_id) {
                case 1:
                    sql1 = `SELECT * FROM Rifa WHERE id_user = ${iduser}`;
                    sql2 = `DELETE FROM Rifa WHERE id_user = ${iduser}`;
                    gRole = message.guild.roles.find(`name`, 'Rifa');
                    break;
                case 2:
                    sql1 = `SELECT * FROM Grove_Street WHERE id_user = ${iduser}`;
                    sql2 = `DELETE FROM Grove_Street WHERE id_user = ${iduser}`;
                    gRole = message.guild.roles.find(`name`, 'Grove Street');
                    break;
                case 3:
                    sql1 = `SELECT * FROM The_Ballas WHERE id_user = ${iduser}`;
                    sql2 = `DELETE FROM The_Ballas WHERE id_user = ${iduser}`;
                    gRole = message.guild.roles.find(`name`, 'The Ballas');
                    break;
                case 4:
                    sql1 = `SELECT * FROM Vagos WHERE id_user = ${iduser}`;
                    sql2 = `DELETE FROM Vagos WHERE id_user = ${iduser}`;
                    gRole = message.guild.roles.find(`name`, 'Vagos');
                    break;
                case 5:
                    sql1 = `SELECT * FROM Aztecas WHERE id_user = ${iduser}`;
                    sql2 = `DELETE FROM Aztecas WHERE id_user = ${iduser}`;
                    gRole = message.guild.roles.find(`name`, 'Aztecas');
                    break;
            }
                db.get(sql1, (err, result2) => {
                if (err) {
                    console.error(err.message);
                }

                if(result2 == undefined){ return console.log('0');}
                if(result2.boss == 1){
                    return message.author.send("Вы не можете покинуть банду пока вы глава");
                }
                else{
                    db.get(sql2, (err) => {
                        if (err) {
                            console.error(err.message);
                        }
                    });
                    sql = `UPDATE users SET fraction_id = 0 WHERE id_user = ${`'`+id+`'`}`;
                    db.get(sql, (err) => {
                    if (err) {
                        console.error(err.message);
                    } 
                    let member = message.mentions.members.first() || message.guild.members.get(id);
                    member.removeRole(gRole.id);
                    return message.channel.send(`${result.name_user} покинул банду!`);
                });
                }
            });
        }
    }
    });
}
module.exports.help = {
    name: "leavegang"
}