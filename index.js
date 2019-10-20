const Discord = require('discord.js');
//const sqlite3 = require('sqlite3').verbose();
const option = require('./option.json');
const elections = require('./function/elections');
const topLvl = require('./function/topLvl');
const topMoney = require('./function/topMoney');
const electionGang = require('./function/electionGang');
const elecGangSettings = require('./function/elecGangSettings');
const fs = require("fs");
const antispam = require('discord-anti-spam');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

//Подключение к БД
/*let db = new sqlite3.Database('./sqlite/sads.db', (err)=>{
  if(err){
    console.log(error.message);
  }
  console.log('Connected to sads.db');
});*/

const {Client} = require('pg');
const db = new Client({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: 5432,
  database: process.env.DATABASE
});

db.connect()
.then(() => console.log("Connected"))
.catch(e => console.log(e))

//Загрузка команд
fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }
  
  jsfile.forEach((f) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on('ready', () => {

  console.log(`Started ${bot.user.tag}!`);

  //Антиспам модуль
  antispam(bot, {
    warnBuffer: 4, 
    maxBuffer: 8, 
    interval: 2000,  
    warningMessage: "Перестань спамить!",  
    banMessage: "Вы получили бан за спаминг", 
    maxDuplicatesWarning: 4,
    maxDuplicatesBan: 8, 
    deleteMessagesAfterBanForPastDays: 7, 
    exemptRoles: ["Разработчик", "SADS-Bot","Глав. Модератор","Модератор"] 
  });

  //Активность бота
  var getInfo = setInterval(function(){
  var date = new Date();
  var timeinfo = `Time: ${date.getHours()}:${date.getMinutes()}`;
  var info = Array(`${bot.users.size} player!`,`RP in Discord`, timeinfo, `${bot.channels.size} channel!`);
  var item = info[Math.floor(Math.random()*info.length)];
  bot.user.setActivity(item);
  },5000);
});

bot.on('guildMemberAdd', member =>{

  //Выдача начальной роли игрокам
  const guild = member.guild;
  let gRole = guild.roles.find(`name`, 'Не зарегистрирован');
  member.addRole(gRole.id);

});

bot.on("message", async message => {

  bot.emit('checkMessage', message);

  //Запуск скриптов на выборы в игре
  if(message.content.slice(0).trim().split(' ') == `start:script`){
    message.delete().catch(error => message.reply("Ошибка"));
    if(message.member.roles.some(r=> ["Разработчик"].includes(r.name))){
      console.log('Script started!');
      elections(message);
      topLvl(message);
      topMoney(message);
      elecGangSettings();
      electionGang(message, 2, 'rifa', 'candRifa');
      electionGang(message, 3, 'grove-street', 'candGroveStreet');
      electionGang(message, 4, 'the-ballas', 'candTheBallas');
      electionGang(message, 5, 'vagos', 'candVagos');
      electionGang(message, 6, 'aztecas', 'candAztecas');
    }
  }

  let prefix = option.prefix;

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let messageArray = message.content.split(/\s+/g);
  let command = messageArray[0];
  let args = messageArray.slice(1);
  if(!command.startsWith(prefix)) return;


  let cmd = bot.commands.get(command.slice(prefix.length));
  if(cmd) cmd.run(bot, message, args, db);

});

bot.login(process.env.TOKEN);