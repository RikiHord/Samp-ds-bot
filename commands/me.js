const Discord = require('discord.js');
const notreg = require('../function/notreg.js');

module.exports.run = async (bot, message, args, db) => {
    message.delete().catch(error =>message.reply("Ошибка"));

    let id = message.author.id;

    let sql = `SELECT id_user, name_user FROM users WHERE id_user = ${id}`;
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err.message);
        }

        if(result == undefined){
            notreg(message);
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