const Discord = require('discord.js');
const ms = require('ms');
const sqlite3 = require('sqlite3');
let db = new sqlite3.Database('./sqlite/sads.db', (err)=>{
    if(err){
      console.log(error.message);
    }
});

async function topMoney (message){
    console.log('Function topMoney started!');
   
    var timertoplvl = setInterval(function(){
            let sql = `SELECT * FROM users ORDER BY money DESC`;
            db.get(sql, (err, result) => {
                if (err) {
                    console.error(err.message);
                }
                if(result[0] || result[1] || result[2] || result[3] || result[4] == undefined) return;
                else{
                let today = new Date();
                let day = String(today.getDate()).padStart(2,'0');
                let month = String(today.getMonth()+1).padStart(2,'0');
                let year = today.getFullYear();

                let embed = new Discord.RichEmbed()
                .setAuthor(`Топ богачей сервера`)
                .setColor("#cfe400")
                .addField(`🥇**1 место**`, `${result[0].name_user} | ${result[0].money}$`)
                .addField(`🥈2 место`, `${result[1].name_user} | ${result[1].money}$`)
                .addField(`🥉3 место`, `${result[2].name_user} | ${result[2].money}$`)
                .addField(`4 место`, `${result[3].name_user} | ${result[3].money}$`)
                .addField(`5 место`, `${result[4].name_user} | ${result[4].money}$`)
                .setFooter(`Дата топа: ${day}/${month}/${year}`)

                let newschannel = message.guild.channels.find(`name`, "📬новости-сервера");
                newschannel.send(embed);
                }
            });
        },604800000);
}
module.exports = topMoney
