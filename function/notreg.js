const Discord = require('discord.js');

async function notreg(message){
    return message.author.send("Для начала зарегистрируйтесь командой ++reg (имя)");
}
module.exports = notreg;