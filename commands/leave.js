const Discord = require("discord.js");

module.exports.run = async (mybot, message, args) => {
    message.delete().catch();

    let voiceChannel = message.member.voiceChannel;
    voiceChannel.leave();
}

module.exports.help = {
  name: "leave"
} 