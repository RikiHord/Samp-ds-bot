const Discord = require("discord.js");

module.exports.run = async (mybot, message, args) => {
    message.delete().catch();
  
    if(!message.member.roles.some(r=>["Админ"].includes(r.name)))
    return message.reply("Извини, но твоих прав не достаточно чтобы использивать это.");
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
  if(!member)
    return message.reply("Этого пользывателя нет на нашем сервере.");

  let role = args.slice(1).join(' ');
  if(!role) return message.reply("Введите название роли!");
  let gRole = message.guild.roles.find(`name`, role);
  if(gRole){
  if(member.roles.has(gRole.id)) return message.reply(`У пользывателя уже есть роль: ${role}.`);
  await(member.addRole(gRole.id));

  try{
    await member.send("Вы получили новую роль " + gRole.name + ". На сервере: " + message.guild.name);
    message.channel.send("Поздравляем " + member + ", он получил новую роль: " + gRole.name)
  }catch(e){
    message.author.send(`Я не смог написать поздравление в личние сообщения`)
  }
  }
  if(!gRole){
    try{
      newrole = await message.guild.createRole({
        name: role,
        color: "#ffffff",
        permissions:[]
      })
      message.author.send("Вы создали новую роль. Не забудьте настроить её, после чего снова выдайте пользывателю.");
    }catch(e){
      console.log(e.stack);
    }
  }
}

module.exports.help = {
  name: "addrole"
}