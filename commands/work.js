const Discord = require('discord.js');
const notreg = require('../function/notreg.js');
const ms = require('ms');

module.exports.run = async (bot, message, args, db) => {
    message.delete().catch(error =>message.reply("Ошибка"));

    var id = message.author.id;

    var member = message.mentions.members.first() || message.guild.members.get(id);
    let work = message.guild.roles.find(`name`, `Заключеный`);
    if(member.roles.has(work.id)){return message.author.send(`Рветесь на работу?`);}

    let sql = `SELECT * FROM users WHERE id_user = ${id}`;
    db.get(sql, (err, result) => {
    if (err) {
        console.error(err.message);
    }

    if(result == undefined){
        notreg(message);
    }
    else{
        let loc = `'${result.location}'`
        let sql = `SELECT * FROM locations WHERE location = ${loc}`;
        db.get(sql, (err, result2) => {
            if (err) {
                console.error(err.message);
            }

        if(!result2.work_loc){
            message.channel.send(`Здесь нету работы для вас!`)
        }
        else{
            var member = message.mentions.members.first() || message.guild.members.get(id);
            let gRole = message.guild.roles.find(`name`, `*Работает*`);
            if(member.roles.has(gRole.id)){return message.author.send(`Вы уже работаете!`);}

            let worktime = args[0];
            if(worktime == undefined) return message.author.send(`Укажите сколько вы бы хотели поработать.`)
            let moneytime = +(result2.moneytime);
            if(ms(worktime) <= moneytime - 1) return message.author.send(`Что-бы заработать прийдется поработать подольше (мин. время: ${searchRes2.moneytime / 60000}м.)`);
            else{
            member.addRole(gRole.id);
            message.channel.send(`${result.name_user} начал работу!`);
            var timerId = setInterval(function(){
                sql = `SELECT * FROM users WHERE id_user = ${id}`;
                db.get(sql, (err, result3) => {
                if (err) {
                    console.error(err.message);
                }

                let newmoney = +(result3.money) + +(result2.work_money);

                sql = `UPDATE users SET money = ${newmoney} WHERE id_user = ${id}`;
                db.get(sql, (err) => {
                    if (err) {
                        console.error(err.message);
                    }
                    return message.author.send(`+${result2.work_money}$`);
                });
                });
            }, moneytime);
            setTimeout(function(){
                clearInterval(timerId);
                member.removeRole(gRole.id);
                return message.channel.send(`${result.name_user} закончил работать.`);
            }, ms(worktime));
            }
        }
        });
    }
});
}
module.exports.help = {
    name: "work"
}