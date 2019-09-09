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

    let sql = `SELECT id_user, name_user FROM users WHERE id_user = ${id}`;
    db.get(sql, (err, result) => {
        if (err) {
            console.error(err.message);
        }

        if(result == undefined){
            notreg();
        }
        else{
            let sayMessage = args.join(" ");
            message.channel.send(`\`\`\`css
${result.name_user} ${sayMessage}\`\`\``);
        }
    });
}
module.exports.help = {
    name: "me"
}