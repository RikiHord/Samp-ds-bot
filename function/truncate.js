const Discord = require('discord.js');
const sqlite3 = require('sqlite3');
let db = new sqlite3.Database('./sqlite/sads.db', (err)=>{
    if(err){
      console.log(error.message);
    }
});

async function truncate(table_name){
    
    let sql = `TRUNCATE ${table_name}`;
    db.get(sql, (err) => {
        if (err) {
            console.error(err.message);
        }
    });

}
module.exports = truncate;