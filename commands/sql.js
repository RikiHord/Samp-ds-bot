const Discord = require('discord.js');
const sqlite3 = require('sqlite3').verbose();


module.exports.run = async (bot, message, args, db) => {
    message.delete().catch(error =>message.reply("Ошибка"));
   
    if(!message.member.roles.some(r=>["Разработчик"].includes(r.name))) return;
    else{
        //Робота с БД
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