const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const mybot = new Discord.Client();
mybot.commands = new Discord.Collection();

mybot.on("ready", async () => {
    console.log(`Started!`);
  
    mybot.user.setActivity("--help");
  });

  const prefix ='--';
  const ownerID = '497100093091086336';
  const active = new Map();

  mybot.on("message", async message => {
    
    let args = message.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();

    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    try {
      delete require.cache[require.resolve(`./commands/${cmd}.js`)];

      let ops = {
        ownerID: ownerID,
        active: active
      }

      let commandFile = require(`./commands/${cmd}.js`);
      commandFile.run(mybot, message, args, ops);
    }catch(e){
      console.log(e.stack);
    }
    
  });
  

mybot.login(botconfig.token);