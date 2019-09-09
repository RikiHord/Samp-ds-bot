const Discord = require('discord.js');
const changeleader = require('../function/changeleader');
const truncate = require('../function/truncate');
const sqlite3 = require('sqlite3');
let db = new sqlite3.Database('./sqlite/sads.db', (err)=>{
    if(err){
      console.log(error.message);
    }
 });

async function electionGang(message, idGang, name_memberGang, tableName){    
    var newschannel = message.guild.channels.find(`name`, name_memberGang);
    console.log(`Function electionGang started! (${name_memberGang})`);

    var timeElectionGang = setInterval(function(){
        let sql = `SELECT electionGang FROM settings`;
        db.get(sql, (err, result) => {
        if (err) {
            console.error(err.message);
        }

        if(result == undefined){
            console.log(`Ошибка! Збой БД!`)
            clearInterval(timeElectionGang);
        }
        else{
            newschannel.send(`Время выбрать главу банды! Высунуть кандидатуру (++addgang).`);
            var timeApplication = setTimeout(function(){
                newschannel.send(`Время подачи заявок оконченно!`);
                sql = `SELECT * FROM ${tableName}`;
                db.get(sql, (err, result) => {
                    if (err) {
                        console.error(err.message);
                    }
                    sql = `SELECT COUNT(*) AS count FROM ${tableName}`;
                    db.get(sql, (err, result2) => {
                        if (err) {
                            console.error(err.message);
                        }

                        const one = `❤`;
                        const two = `💛`;
                        const three = `💚`;
                        const four = `💙`;
                        const five = `💜`;
                        var idleader = null;
                        switch (result2.count) {
                            case 1:
                                newschannel.send(`Новый глава ${result[0].name_user}, поскольку он единственый кандидат.`);
                                changeleader(message, idGang ,result[0].id_user);
                                truncate(tableName);
                                break;
                            case 2:
                                async function msgs2(){
                                let msg = await newschannel.send(`**Кандидаты:** \n ${one}) ${result[0].name_user}; \n ${two}) ${result[1].name_user}.\n Что бы проголосовать выберете реакцию ниже.`);
                                await msg.react(one);
                                await msg.react(two);
                                let reactions = await msg.awaitReactions(reaction => reaction.emoji.name === one || reaction.emoji.name === two, {time: 20000});
                                let onecount = reactions.get(one).count;
                                let twocount = reactions.get(two).count;
                                newschannel.send(`Голосование оконченно! \n ${one}: ${onecount}\n ${two}: ${twocount}`);
                                if(onecount >= twocount){
                                    newschannel.send(`Новый глава ${result[0].name_user}`);
                                    idleader = 0;
                                }
                                else{
                                    newschannel.send(`Новый глава ${result[1].name_user}`);
                                    idleader = 1;
                                }
                                changeleader(message, idGang ,result[idleader].id_user);
                                truncate(tableName);
                                }
                                msgs2();
                                break;
                            case 3:
                                async function msgs3(){
                                    let msg = await newschannel.send(`**Кандидаты:** \n ${one}) ${result[0].name_user}; \n ${two}) ${result[1].name_user};\n ${three}) ${result[2].name_user}.\n Что бы проголосовать выберете реакцию ниже.`);
                                    await msg.react(one);
                                    await msg.react(two);
                                    await msg.react(three);
                                    let reactions = await msg.awaitReactions(reaction => reaction.emoji.name === one || reaction.emoji.name === two || reaction.emoji.name === three, {time: 20000});
                                    let onecount = reactions.get(one).count;
                                    let twocount = reactions.get(two).count;
                                    let threecount = reactions.get(three).count;
                                    newschannel.send(`Голосование оконченно! \n ${one}: ${onecount}\n ${two}: ${twocount}\n ${three}: ${threecount}`);
                                    if(onecount >= twocount && threecount){
                                        newschannel.send(`Новый глава ${result[0].name_user}`);
                                        idleader = 0;
                                    }
                                    else if(twocount >= threecount){
                                        newschannel.send(`Новый глава ${result[1].name_user}`);
                                        idleader = 1;
                                    }
                                    else{
                                        newschannel.send(`Новый глава ${result[2].name_user}`); 
                                        idleader = 2;
                                    }
                                    changeleader(message, idGang ,result[idleader].id_user);
                                    truncate(tableName);
                                    }
                                    msgs3();
                                break;
                            case 4:
                                async function msgs4(){
                                    let msg = await newschannel.send(`**Кандидаты:** \n ${one}) ${result[0].name_user}; \n ${two}) ${result[1].name_user};\n ${three}) ${result[2].name_user};\n ${four}) ${result[3].name_user}.\n Что бы проголосовать выберете реакцию ниже.`);
                                    await msg.react(one);
                                    await msg.react(two);
                                    await msg.react(three);
                                    await msg.react(four);
                                    let reactions = await msg.awaitReactions(reaction => reaction.emoji.name === one || reaction.emoji.name === two || reaction.emoji.name === three || reaction.emoji.name === four, {time: 20000});
                                    let onecount = reactions.get(one).count;
                                    let twocount = reactions.get(two).count;
                                    let threecount = reactions.get(three).count;
                                    let fourcount = reactions.get(four).count;
                                    newschannel.send(`Голосование оконченно! \n ${one}: ${onecount}\n ${two}: ${twocount}\n ${three}: ${threecount}\n ${four}: ${fourcount}`);
                                    if(onecount >= twocount && threecount && fourcount){
                                        newschannel.send(`Новый глава ${result[0].name_user}`);
                                        idleader = 0;
                                    }
                                    else if(twocount >= threecount && fourcount){
                                        newschannel.send(`Новый глава ${result[1].name_user}`);
                                        idleader = 1;
                                    }
                                    else if(threecount >= fourcount){
                                        newschannel.send(`Новый глава ${result[2].name_user}`);
                                        idleader = 2;
                                    }
                                    else{
                                        newschannel.send(`Новый глава ${result[3].name_user}`);
                                        idleader = 3;
                                    }
                                    changeleader(message, idGang ,result[idleader].id_user);
                                    truncate(tableName);
                                    }
                                    msgs4();
                                break;
                            case 5:
                                async function msgs5(){
                                    let msg = await newschannel.send(`**Кандидаты:** \n ${one}) ${result[0].name_user}; \n ${two}) ${result[1].name_user};\n ${three}) ${result[2].name_user};\n ${four}) ${result[3].name_user};\n ${five}) ${result[4].name_user}.\n Что бы проголосовать выберете реакцию ниже.`);
                                    await msg.react(one);
                                    await msg.react(two);
                                    await msg.react(three);
                                    await msg.react(four);
                                    await msg.react(five);
                                    let reactions = await msg.awaitReactions(reaction => reaction.emoji.name === one || reaction.emoji.name === two || reaction.emoji.name === three || reaction.emoji.name === four || reaction.emoji.name === five, {time: 20000});
                                    let onecount = reactions.get(one).count;
                                    let twocount = reactions.get(two).count;
                                    let threecount = reactions.get(three).count;
                                    let fourcount = reactions.get(four).count;
                                    let fivecount = reactions.get(five).count;
                                    newschannel.send(`Голосование оконченно! \n ${one}: ${onecount}\n ${two}: ${twocount}\n ${three}: ${threecount}\n ${four}: ${fourcount} \n ${five}: ${fivecount}`);
                                    if(onecount >= twocount && threecount && fourcount && fivecount){
                                        newschannel.send(`Новый глава ${result[0].name_user}`);
                                        idleader = 0;
                                    }
                                    else if(twocount >= threecount && fourcount && fivecount){
                                        newschannel.send(`Новый глава ${result[1].name_user}`);
                                        idleader = 1;
                                    }
                                    else if(threecount >= fourcount && fivecount){
                                        newschannel.send(`Новый глава ${result[2].name_user}`);
                                        idleader = 2;
                                    }
                                    else if(fourcount >= fivecount){
                                        newschannel.send(`Новый глава ${result[3].name_user}`);
                                        idleader = 3;
                                    }
                                    else{
                                        newschannel.send(`Новый глава ${result[4].name_user}`);
                                        idleader = 4;
                                    }
                                    changeleader(message, idGang ,result[idleader].id_user);
                                    truncate(tableName);
                                    }
                                    msgs5();
                                break;
                            default:
                                newschannel.send(`Ни кто не посмел кинуть вызов главе! Глава остается.`);
                                break;
                        }
                });
                });
            },20000);
        }
        });
    },50000);
}
module.exports = electionGang;