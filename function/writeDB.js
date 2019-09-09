const Discord = require('discord.js');
const sqlite3 = require('sqlite3').verbose();

 let db = new sqlite3.Database('./sqlite/sads.db', (err)=>{
    if(err){
      console.log(error.message);
    }
  });

function writeDB(id, name, message){
    let location = `'Вокзал'`;

    let sql = 'INSERT INTO users VALUES (' + [`'`+id+`'`, name, location, 100, 1, 0, 0].join(',') + ')';
    db.get(sql, (err) => {
        if (err) 
            return console.error(err.message);
            role();
        return message.channel.send(`Поздравляем с регистрацией. Ваш ник в игре: ${name}`);
    });

    async function role(){
        let member = message.mentions.members.first() || message.guild.members.get(id);
        let role = '1 лвл';
        let gRole = message.guild.roles.find(`name`, role);
        
        await(member.addRole(gRole.id));

        try{
            await message.author.send(`${member} поздравляю! Ваш уровень повышен: ${gRole.name}`);
        }catch(e){
        
        }
        role = 'Вокзал';
        gRole = message.guild.roles.find(`name`, role);
        
        await(member.addRole(gRole.id));

        try{
            await member.send(`С прибытием, ваше место нахождение: ${gRole.name}`);
        }catch(e){
        
        }
    }    
}
module.exports = writeDB;