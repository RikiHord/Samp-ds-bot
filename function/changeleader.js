const Discord = require('discord.js');
const ms = require('ms');
const sqlite3 = require('sqlite3');
let db = new sqlite3.Database('./sqlite/sads.db', (err)=>{
    if(err){
      console.log(error.message);
    }
 });

async function changeleader (message, idOrgs, idNewLeader){
   let sql = `SELECT * FROM leader WHERE idOrg = ${idOrgs}`;
   db.get(sql, (err, result) => {
    if (err) {
        console.error(err.message);
    }
    let gRole = message.guild.roles.find(`name`, result.title);
    let leader = message.mentions.members.first() || message.guild.members.get(result.id_leader);
    await(leader.removeRole(gRole.id));
    let newleader = message.mentions.members.first() || message.guild.members.get(idNewLeader);
    await(newleader.addRole(gRole.id));
    sql = `UPDATE leader SET id_leader = ${idNewLeader} WHERE idOrg = ${idOrgs}`;
    db.get(sql, (err, result) => {
        if (err) {
            console.error(err.message);
        }
    });
});
}
module.exports = changeleader;