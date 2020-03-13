const Discord = require('discord.js');
const writeDB = require('./writeDB');

const {Client} = require('pg');
const db = new Client({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: 5432,
  database: process.env.DATABASE
});

db.connect();

function findDB(id, name, message, named){
   let sql = { 
      text: `SELECT * FROM users WHERE id_user = $1`,
      values: [id]
   }
   try{
   db.query(sql, (err, result) => {
      if (err) {
         console.error(err.message);
      }
      if(result.id_user == undefined){
         let sql = {
            text: `SELECT name_user FROM users WHERE name_user = $1`,
            values: [name]
         }
            db.query(sql, (err, result2) => {
               if (err) {
                  console.error(err.message);
               } 
               if(result2.name_user == undefined){
                  if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')) return message.channel.send('I don\'t have permission to change your nickname!');
                  message.member.setNickname(named);
                  let id = message.author.id;
                  let member = message.mentions.members.first() || message.guild.members.get(id);
                  member.removeRole('595555181152829440');
                  writeDB(id, name, message, db);
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
   catch(err){
      console.log(err);
   }
}
module.exports = findDB;