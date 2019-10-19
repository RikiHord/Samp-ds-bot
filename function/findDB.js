const Discord = require('discord.js');
const sqlite3 = require('sqlite3').verbose();
const writeDB = require('./writeDB');

let db = new sqlite3.Database('./sqlite/sads.db', (err)=>{
   if(err){
     console.log(error.message);
   }
});

function findDB(id, name, message, named){
   let sql = `SELECT * FROM users WHERE id_user = ${id}`;
   db.get(sql, (err, result) => {
      if (err) {
         console.error(err.message);
      }

      if(result == undefined){
         let sql = `SELECT name_user FROM users WHERE name_user = ${name}`;
            db.get(sql, (err, result2) => {
               if (err) {
                  console.error(err.message);
               } 

               if(result2 == undefined){
                  if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')) return message.channel.send('I don\'t have permission to change your nickname!');
                  message.member.setNickname(named);
                  let id = message.author.id;
                  let member = message.mentions.members.first() || message.guild.members.get(id);
                  member.removeRole('595555181152829440');
                  writeDB(id, name, message);
               }
               else{
                  return message.author.send(`Ник занят, попробуйте ввести другой!`);
               }
            });
      }
      else{
         message.author.send(`Вы уже зарегестрированы под именем ${result.name_user}`);
      }
      });
}
module.exports = findDB;