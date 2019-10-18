const Discord = require("discord.js");
const ytdl = require('ytdl-core');

module.exports.run = async (mybot, message, args, ops) => {

    if(!message.member.voiceChannel) return message.channel.send("Укажите путь!");

    if(!args[0]) return message.channel.send("А название песни? А?");

    let validate = await ytdl.validateURL(args[0]);

    if(!validate) return message.channel.send("Что-то пошло не так, может вы что-то ввели не так?");

    let info = await ytdl.getInfo(args[0]);

    let data = ops.active.get(message.guild.id) || {};

    if(!data.connection) data.connection = await message.member.voiceChannel.join();
    if(!data.queue) data.queue = [];
    data.guildID = message.guild.id;

    data.queue.push({
        songTitle: info.title,
        requester: message.author.tag,
        url: args[0],
        announceChannel: message.channel.id
    });

    if(!data.dispatcher) play(mybot, ops, data);
    else{
        message.channel.send(`Added to queue: ${info.title} | Requested by ${message.author.id}`);
    }

    ops.active.set(message.guild.id, data);

    async function play(mybot, ops, data){
        mybot.channels.get(data.queue[0].announceChannel).send(`Now play ${data.queue[0].songTitle} | Requested by ${data.queue[0].requester}`);
        data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, {filter: "audioonly"}));
        data.dispatcher.guildID = data.guildID;

        data.dispatcher.once('end', function(){
            finishhh(mybot, ops, this);
        }); 
    }
    function finishhh(mybot, ops, dispatcher){
        let fetched = ops.active.get(dispatcher.guildID);
        fetched.queue.shift();
        if(fetched.queue.length > 0){
            ops.active.set(dispatcher.guildID, fetched);
            play(mybot,ops,fetched);
        }
        else{
            ops.active.deleted(dispatcher.guildID);

            let vc = mybot.guilds.get(dispatcher.guildID).me.voiceChannel;
            if(vc) vc.leave();
        }
    }
}


module.exports.help = {
  name:"play"
}
