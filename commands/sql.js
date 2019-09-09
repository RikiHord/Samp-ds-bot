const Discord = require('discord.js');
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./sqlite/sads.db', (err)=>{
    if(err){
      console.log(error.message);
    }
});

module.exports.run = async (bot, message, args) => {
    message.delete().catch(error =>message.reply("Ошибка"));
   
    if(!message.member.roles.some(r=>["Разработчик"].includes(r.name))) return;
    else{
        let sqlMessage = args.join(" ");
        let sql = `${sqlMessage}`;
        db.get(sql, (err, result) => {
        if (err) {
            console.error(err.message);
        }
        else{
            console.log(result);
            message.author.send(`Запрос выполнен!`);
        }
        });
    }
}
module.exports.help = {
    name: "sql"
}