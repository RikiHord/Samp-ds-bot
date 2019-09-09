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
                notreg();
            }
            else{
                var member = message.mentions.members.first() || message.guild.members.get(id);
                let work = message.guild.roles.find(`name`, `*Работает*`);
                if(member.roles.has(work.id)) {return message.author.send(`Пока вы работаете перемешение не возможно`);}
                work = message.guild.roles.find(`name`, `Заключенный`);
                if(member.roles.has(work.id)){return message.author.send(`Вы пытались збежать?`);}
                else {role(searchRes, member);}
            }
        });

        async function role(searchRes, member){
            let role = searchRes.location;

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