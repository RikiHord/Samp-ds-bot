const Discord = require('discord.js');
const sqlite3 = require('sqlite3');
let db = new sqlite3.Database('./sqlite/sads.db', (err)=>{
    if(err){
      console.log(error.message);
    }
 });

async function elecGangSettings(){    
    console.log(`Function elecGangSettings started!`);

    var timeElectionGang = setInterval(function(){
        let sql = `UPDATE settings SET electionGang = 1`;
        db.get(sql, (err, result) => {
            if (err) {
                console.error(err.message);
            }
            var timeApplication = setTimeout(function(){
                let sql = `UPDATE settings SET electionGang = 0`;
                db.get(sql, (err, result) => {
                    if (err) {
                        console.error(err.message);
                    }
                });
            },20000);
        });
    },50000);
}
module.exports = elecGangSettings;