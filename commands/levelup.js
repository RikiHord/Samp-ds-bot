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
        let lvl = result.lvl;
        if(lvl == 10){
            return message.author.send("Вы достигли максимального уровня!");
        }
        let money = result.money;
        if(+lvl + 1 <= 5){
            let progres = 3;
            for(let i = 1; i < +lvl + 1; i++){
                progres = progres * 3;
            }
            var levelupmoney = 100*progres;
        }
        else{
            var levelupmoney = 100*243*(+lvl - 5);
        }
        if(levelupmoney < money){
            let sql = `UPDATE users SET money = ${+money - levelupmoney} WHERE id_user = ${id}`;
                db.get(sql, (err) => {
                    if (err) {
                        console.error(err.message);
                    }
                });
            sql = `UPDATE users SET lvl = ${+lvl + 1} WHERE id_user = ${id}`;
                db.get(sql, (err) => {
                    if (err) {
                        console.error(err.message);
                    }
                    levelup();
                });
            async function levelup(){
                    let member = message.mentions.members.first() || message.guild.members.get(id);
                    let role = `${+lvl} лвл`;
                    let gRole = message.guild.roles.find(`name`, role);
                    
                    await(member.removeRole(gRole.id));
                    
                    role = `${+lvl + 1} лвл`;
                    gRole = message.guild.roles.find(`name`, role);
                    
                    await(member.addRole(gRole.id));
            
                    try{
                        await message.author.send(`${member} поздравляю! Ваш уровень повышен: ${gRole.name}`);
                    }catch(e){
                    
                    }
                }    
        }
        else{
            return message.author.send(`Не хватает денег для повышения уровня ${levelupmoney - money}$`); 
        }
    }
    });

}
module.exports.help = {
    name: "levelup"
  }