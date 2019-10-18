const Discord = require("discord.js");

module.exports.run = async (mybot, message, args) => {

      const sayMessage = args.join(" ");
      message.delete().catch();
      message.channel.send('@everyone ' + sayMessage);

}

module.exports.help = {
  name: "saye"
}