const Discord = require('discord.js');

const {Client} = require('pg');
const db = new Client({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: 5432,
  database: process.env.DATABASE
});

db.connect();

function writeDB(id, name, message){
    let location = `'Вокзал'`;

    let sql = 'INSERT INTO users VALUES (' + [`'`+id+`'`, name, location, 100, 1, 0, 0].join(',') + ')';
    db.query(sql, (err) => {
        if (err) return console.error(err.message);
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