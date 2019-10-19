const Discord = require('discord.js');
const notreg = require('../function/notreg.js');

module.exports.run = async (bot, message, args, db) => {
    message.delete().catch(error =>message.reply("Ошибка"));

    let id = message.author.id;

    let rrole = args[0];
    if(!rrole){
        return message.author.send("Куда ехать будем. Укажите точку прибытия!");
    }
    else{
        let sql = `SELECT id_user, location FROM users WHERE id_user = ${id}`;
        db.get(sql, (err, result) => {
            if (err) {
                console.error(err.message);
            }
            
            if(result == undefined){
                notreg(message); //Игрок не зарегестрирован
            }
            else{
                var member = message.mentions.members.first() || message.guild.members.get(id);
                let work = message.guild.roles.find(`name`, `*Работает*`);
                if(member.roles.has(work.id)) {return message.author.send(`Пока вы работаете перемешение не возможно`);}
                work = message.guild.roles.find(`name`, `Заключенный`);
                if(member.roles.has(work.id)){return message.author.send(`Вы пытались збежать?`);}
                else {role(result, member);}
            }
        });

        async function role(result, member){
            let role = result.location;

            if(role == args[0]){
                message.author.send("Вы и так уже здесь!");
            }
            else{
                let gRole = message.guild.roles.find(`name`, role);

                let newrole = args[0];
                let newgRole = message.guild.roles.find(`name`, newrole);

                if(!newgRole){
                    message.author.send("Такого места не существует, попробуйте выбрать другую точку прибытия");
                }
                else{
                    await(member.removeRole(gRole.id));

                    role = args[0];
                    gRole = message.guild.roles.find(`name`, role);

                    await(member.addRole(gRole.id));
            
                    let id = message.author.id;
                    let roled = `'${role}'`

                    let sql = `UPDATE users SET location = ${roled} WHERE id_user = ${id}`;
                    db.get(sql, (err) => {
                        if (err) {
                            console.error(err.message);
                        }
                    });

                    try{
                        await member.send(`С прибытием, ваше место нахождение: ${role}`);
                    }catch(e){
        
                    }
                }
            }
        }
    }
}
module.exports.help = {
    name: "go"
}