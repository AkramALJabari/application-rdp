const Discord = require("discord.js");
const { MessageEmbed , Util , Client, Intents } = require("discord.js");
const db = require("quick.db");
require("colors");

const client = new Client({ intents: [
Intents.FLAGS.GUILDS,
Intents.FLAGS.GUILD_MESSAGES,
Intents.FLAGS.DIRECT_MESSAGES,
Intents.FLAGS.DIRECT_MESSAGE_TYPING,
Intents.FLAGS.GUILD_MEMBERS,
Intents.FLAGS.GUILD_BANS,
Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
],
partials: ['MESSAGE', 'CHANNEL', 'REACTION']});
client.setMaxListeners(0)
client.login(`ODkxNjA5Mzc4OTg0MTY1Mzc2.YVA18Q.qINQjHoCBdP8p4DnzRXK9d-6BnA`)
const app = require('express')();


app.get('/', (req, res) => res.send('Server is up.'));

app.listen(3000);

client.on("ready" , () => {
    console.log(`[INFO] - Bot Name : ${client.user.username} - [INFO]`.bold.green)
    console.log(`[INFO] - Bot Guild (s) : ${client.guilds.cache.size} - [INFO]`.bold.green)
});

const rules = ["GR","DOS","PK","MG","DM","MD","VDM","CK","ATA","KOS","BH","PG"];

let prefix = "!";

let supported = ['604200067515154446','725669950303371325','339349482548363274','716717221337890886','678517905150836757','717725834819141682',"827321696632832040","564869233469685764","716022917124587631", "915281468840890379", "608224231322419202","813789147059585035"];
//Mta
client.on("messageCreate" , async (message) => {
    if(message.content.startsWith(`${prefix}mta-toggle-apply`)){
        if(!supported.includes(message.author.id)) return message.channel.send({ content: "**لاتستطيع استعمال هذا الامر**" })
        let database = await db.get(`Mta-Apply[Guild:${message.guild.id}]`);
        if(database === null) {
            await db.set(`Mta-Apply[Guild:${message.guild.id}]`,"off");
            message.channel.send({ content: `**Apply Status now is \`OFF\`**` })
            return
        }
        if(database === "off"){
            await db.set(`Mta-Apply[Guild:${message.guild.id}]`,"on");
            message.channel.send({ content: `**Apply Status now is \`ON\`**` })
            return
        }
        if(database === "on"){
            await db.set(`Mta-Apply[Guild:${message.guild.id}]`,"off");
            message.channel.send({ content: `**Apply Status now is \`OFF\`**` })
            return
        }
    }
});

client.on("messageCreate" , async(message) => {
    if(message.content.startsWith(prefix + "mta-apply")){
        if(message.channel.id != "945401900302491770") return message.reply({ content: `**Please Go To <#945401900302491770>**` })
        let d = await db.get(`Mta-BlackList_${message.author.id}`);
        if(d === null) {
            d = 'off'
            await db.get(`Mta-BlackList_${message.author.id}`,'off');
        } 
        if(d === 'on') return message.reply({ content: `**Sorry You can't use this command!!**` })
        let database = await db.get(`Mta-Apply[Guild:${message.guild.id}]`);
        if(database === "off") return message.channel.send({ content: "**التقديم مغلق حاليا**" });
        if(database === null) return message.channel.send({ content: "**التقديم مغلق حاليا**" });
        //if(message.guild.id != '') return message.guild.leave()
        message.delete()
        message.channel.send({ content: `**شوف خاصك**` }).then((msg) => msg.delete({timeout:5000}))
        if(message.author.bot) return;
        let filter = (m) => m.author.id === message.author.id;
        let accountName;
        let characterName;
        let characterID;
        let characterHours;
        let realName;
        let realAge;
        let supportCommands;
        let rules;
        try {
        message.author.send({ content: `**اسم حسابك داخل السيرفر**` })
        .then((msg) => {
            message.author.dmChannel.awaitMessages({filter,max:1})
            .then((collected1) => {
                accountName = collected1.first().content;
                //msg.delete()
                message.author.send({ content: `**اسم شخصيتك داخل السيرفر**`})
                .then((msg1) => {
                    message.author.dmChannel.awaitMessages({filter,max:1})
                    .then((collected2) => {
                        characterName = collected2.first().content;
                        //msg1.delete()
                        message.author.send({content: `**ايدي حسابك**`})
                        .then((msg2) => {
                            message.author.dmChannel.awaitMessages({filter,max:1})
                            .then((collected3) => {
                                characterID = collected3.first().content
                                //msg2.delete()
                                message.author.send({content: `**عدد ساعات شخصيتك**`})
                                .then((msg3) => {
                                    message.author.dmChannel.awaitMessages({filter,max:1})
                                    .then((collected4) => {
                                        characterHours = collected4.first().content;
                                     //   msg3.delete()
                                        message.author.send({content: `**اسمك الحقيقي**`})
                                        .then((msg4) => {
                                            message.author.dmChannel.awaitMessages({filter,max:1})
                                            .then((collected5) => {
                                                realName = collected5.first().content;
                                          //      msg4.delete()
                                                message.author.send({content: `**عمرك**`})
                                                .then((msg5) => {
                                                    message.author.dmChannel.awaitMessages({filter,max:1})
                                                    .then((collected6) => {
                                                        realAge = collected6.first().content;
                                                        //msg5.delete()
                                                        message.author.send({content: `**اكتب  20 أمر سابورت **`})
                                                        .then((msg6) => {
                                                            message.author.dmChannel.awaitMessages({filter,max:1})
                                                            .then((collected7) => {
                                                                supportCommands = collected7.first().content;
                                                           //     msg6.delete()
                                                                message.author.send({content: `**اشرح الفواعد التالية:\nGR-PK-DOS-KOS-ATA-ARSON-BH-PG-PD-MG**`})
                                                                .then((msg7) => {
                                                                    message.author.dmChannel.awaitMessages({filter,max:1})
                                                                    .then((collected8) => {
                                                                        rules = collected8.first().content
                                                                        //msg7.delete()
                                                                        message.author.send({content: `**صورة لل history : **`})
                                                                            .then((msg8) => {
                                                                                message.author.dmChannel.awaitMessages({filter,max:1})
                                                                                .then(async(collected) => {
                                                                                    if(!collected.first().attachments.first()) {
                                                                                        IMG = collected.first().content
                                                                                        if(!IMG.startsWith("https://") || !IMG.startsWith("http://")) return msg.edit("Invalid Link")
                                                                                    }
                                                                                    else {
                                                                                        IMG = collected.first().attachments.first().proxyURL
                                                                                    }
                                                                                    message.author.send({content: `**جاري جمع المعلومات .......**`})
                                                                                let ApplyEmbed = new MessageEmbed()
                                                                                    .setTitle(`تقديم جديد من طرف (${message.author.tag} [ID:${message.author.id}])`)
                                                                                    .addField({ name:`**معلومات الحساب**`, value:`**اسم الحساب : ${accountName}**
**اسم الشخصية : ${characterName}**
**ايدي الحساب : ${characterID}**
**ساعات الشخصية : ${characterHours}**`
                                                                                    } )
                                                                                    .addField({ name:`**معلومات المتقدم**`,value:`**الاسم الحقيقي : ${realName}**
**العمر الحقيقي : ${realAge}**
**اسم حساب الديسكورد : ${message.author.tag}**
**ايدي حساب الديسكورد : ${message.author.id}**`
                                                                                    } )
                                                                                    .addField(`**الاوامر**`,`\`\`\`\n${supportCommands}\n\`\`\``)
                                                                                    .addField(`**القوانين**`,`**\`\`\`\n${rules}\n\`\`\`**`)
                                                                                    .setFooter({ text: message.author.tag + ' (ID:'+message.author.id+')',iconURL: message.author.displayAvatarURL({dynamic:true,format:'png'}) })
                                                                                    .setColor("GREEN")
                                                                                    .setImage(IMG)
                                                                                client.channels.cache.get("945401878169141349").send({ embeds: [ApplyEmbed] })
                                                                                client.channels.cache.get("945401878169141349").send({ content: `**القوانين المطلوبة : \nGR-PK-DOS-KOS-ATA-ARSON-BH-PG-PD-MG**` })
                                                                                message.author.send({ content: `**تم ارسال التقديم**` })
                                                                            })
                                                                        })
                                                                    })
                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        }).catch(err => {
            message.react("❌")
            .then(() => {
                message.channel.send({ content: `**افتح خاصك**` }) 
            });
        })
            } catch {
            message.react("❌")
            .then(() => {
                message.channel.send({ content: `**افتح خاصك**` }) 
            });
            }
    }
});

client.on("messageCreate" , async(message) => {
    if(message.content.startsWith(prefix + "mta-start-apply")){
        message.delete()
        if(!supported.includes(message.author.id)) return message.channel.send({ content: "**لاتستطيع استعمال هذا الامر**" })
        await db.set(`Mta-Apply[Guild:${message.guild.id}]`,"on");
        let Embed = new MessageEmbed()
            .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({dynamic:true,format:'png'}) })
            .setFooter({ text: "By"+message.author.username, iconURL: message.author.displayAvatarURL({dynamic:true,format:'png'}) })
            .setTitle("تقديم على طاقم الدعم الفني | Support Apply")
            .setDescription(`**تم فتح تقديم السبورت لخادم رويال تايم وذالك باستعامل امر \`${prefix}apply\`
شــروط الــتــقــديــم:
\`#1\`- فوق 30 ساعة
\`#2\`- سجون اقل من 3 لا يوجد بهم (GR - PG)
\`#3\`- خبرة كافية بالقوانين و يجب ان تكون على علم بأوامر السبورت
**`)
            .setImage("https://cdn.discordapp.com/attachments/874704319784550480/888748327557009478/apply.png")
            .setTimestamp()
            .setColor("RANDOM")
            .setThumbnail(message.guild.iconURL({dynamic:true}))
        message.guild.channels.cache.get("947466406230904862").send({ content: "هام!!!! @everyone", embeds: [Embed] })
    }
});

client.on("messageCreate" , async (message) => {
    if(message.content.startsWith(prefix+"mta-close-apply")){
        if(!supported.includes(message.author.id)) return message.channel.send({ content: "**لاتستطيع استعمال هذا الامر**" })
        message.delete()
        message.guild.channels.cache.get("947466406230904862").send({ content: "**تم غلق التقديم وسيتم الاعلان عن اسماء المقبولين قريبا**" })
        await db.set(`Mta-Apply[Guild:${message.guild.id}]`,"off");
    }
})


client.on("messageCreate" , async (message) => {
    if(message.content.startsWith(prefix + "mta-blacklist")){
        if(!["716717221337890886","725669950303371325","678517905150836757","604200067515154446"].includes(message.author.id)) return;
        let user = message.mentions.users.first();
        if(!user) return message.reply({ content: `**${prefix}mta-blacklist [USER]**` })
        await db.set(`Mta-BlackList_${user.id}`,'on')
        message.reply({ content: `**✅ Successfully added ${user} to blacklist database **` })
    }
});

client.on("messageCreate" , async (message) => {
    if(message.content.startsWith(prefix + "mta-unblacklist")){
        if(!["716717221337890886","725669950303371325","678517905150836757","604200067515154446"].includes(message.author.id)) return;
        let user = message.mentions.users.first();
        if(!user) return message.reply({ content: `**${prefix}mta-unblacklist [USER]**` })
        await db.set(`Mta-BlackList_${user.id}`,'off')
        message.reply({ content: `**✅ Successfully removed ${user} from blacklist database **` })
    }
});



//Discord
client.on("messageCreate" , async (message) => {
    if(message.content.startsWith(`${prefix}discord-toggle-apply`)){
        if(!supported.includes(message.author.id)) return message.channel.send({ content: "**لاتستطيع استعمال هذا الامر**" })
        let database = await db.get(`Discord-Apply[Guild:${message.guild.id}]`);
        if(database === null) {
            await db.set(`Discord-Apply[Guild:${message.guild.id}]`,"off");
            message.channel.send({ content: `**Apply Status now is \`OFF\`**` })
            return
        }
        if(database === "off"){
            await db.set(`Discord-Apply[Guild:${message.guild.id}]`,"on");
            message.channel.send({ content: `**Apply Status now is \`ON\`**` })
            return
        }
        if(database === "on"){
            await db.set(`Discord-Apply[Guild:${message.guild.id}]`,"off");
            message.channel.send({ content: `**Apply Status now is \`OFF\`**` })
            return
        }
    }
});

client.on("messageCreate" , async (message) => {
    if(message.content.startsWith(prefix + "discord-apply")){
        if(message.channel.id != "945401900302491770") return message.reply({ content: `**Please Go To <#945401900302491770>**` })
        let d = await db.get(`Discord-BlackList_${message.author.id}`);
        if(d === null) {
            d = 'off'
            await db.get(`Discord-BlackList_${message.author.id}`,'off');
        } 
        if(d === 'on') return message.reply({ content: `**Sorry You can't use this command!!**` })
        let database = await db.get(`Discord-Apply[Guild:${message.guild.id}]`);
        if(database === "off") return message.channel.send({ content: "**التقديم مغلق حاليا**" });
        if(database === null) return message.channel.send({ content: "**التقديم مغلق حاليا**" });
        let name;
        let age;
        let duration;
        let acc;
        let commands;
        let xp;
        let conv;
        message.delete()
        message.channel.send({ content: `**شوف خاصك**` }).then((msg) => msg.delete({timeout:5000}))
        if(message.author.bot) return;
        let filter = (m) => m.author.id === message.author.id;
        message.author.send({ content: `**اسمك الحقيقي**` })
        .then((msg) => {
            message.author.dmChannel.awaitMessages({filter,max:1})
            .then((collected1) => {
                name = collected1.first().content;
               // msg.delete()
                message.author.send({content: `**عمرك**`})
                .then((msg1) => {
                    message.author.dmChannel.awaitMessages({filter,max:1})
                    .then((collected2) => {
                        age = collected2.first().content;
                       // msg1.delete()
                        message.author.send({content: `**مدة معرفتك بديسكورد ؟**`})
                        .then((msg2) => {
                            message.author.dmChannel.awaitMessages({filter,max:1})
                            .then((collected3) => {
                                duration = collected3.first().content;
                                //msg2.delete()
                                message.author.send({content: `**مدة حسابك الحالي في ديسكورد ؟**`})
                                .then((msg3) => {
                                    message.author.dmChannel.awaitMessages({filter,max:1})
                                    .then((collected4) => {
                                        acc = collected4.first().content;
                                        //msg3.delete()
                                        message.author.send({content: `**اشرح الاوامر التالية:\n#mute #unmute #warn #unwarn #ban #unban #vkick #kick #unkick**`})
                                        .then((msg4) => {
                                            message.author.dmChannel.awaitMessages({filter,max:1})
                                            .then((collected5) => {
                                                commands = collected5.first().content
                                               // msg4.delete()
                                                message.author.send({content: `**ما هي خبراتك بالديسكورد ؟**`})
                                                .then((msg5) => {
                                                    message.author.dmChannel.awaitMessages({filter,max:1})
                                                    .then((collected6) => {
                                                        xp = collected6.first().content
                                                        //msg5.delete()
                                                        message.author.send({content: `**ب أيش راح تفيدنا وتخلينا نقبلك سبب مقنع ؟**`})
                                                        .then((msg6) => {
                                                            message.author.dmChannel.awaitMessages({filter,max:1})
                                                            .then((collected7) => {
                                                                conv = collected7.first().content
                                                                //msg6.delete()
                                                                message.author.send({content: `**جاري جمع البيانات**`})
                                                                let ApplyEmbed = new MessageEmbed()
                                                                    .setTitle(`تقديم جديد من طرف (${message.author.tag} [ID:${message.author.id}])`)
                                                                    .addFields({ name:`**Info**`, value:`**الاسم + العمر : ${name} + ${age}**
**مدة المعرفة في الديكورد : ${duration}**
**عمر الحساب : ${acc}**
**ايدي الحساب : ${message.author.id}**`
                                                                               } )
                                                                    .addField(`**شرح الاوامر **`,`\`\`\`\n${commands}\n\`\`\``)
                                                                    .addField(`**الخبرات : **`,`**${xp}**`)
                                                                    .addField(`**سبب القبول **`,`${conv}`)
                                                                    .setFooter({ text: message.author.tag + ' (ID:'+message.author.id+')',iconURL: message.author.displayAvatarURL({dynamic:true,format:'png'}) })
                                                                    .setColor("GREEN")   
                                                                message.guild.channels.cache.get('945401879549075556').send({embeds: [ApplyEmbed]})
                                                                message.author.send({content: `**تم ارسال التقديم**`})
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    }
});


client.on("messageCreate" , async(message) => {
    if(message.content.startsWith(prefix + "discord-start-apply")){
        message.delete()
        if(!supported.includes(message.author.id)) return message.channel.send({content: "**لاتستطيع استعمال هذا الامر**"})
        await db.set(`Discord-Apply[Guild:${message.guild.id}]`,"on");
        let Embed = new MessageEmbed()
            .setAuthor({name: message.author.username,iconURL: message.author.displayAvatarURL({dynamic:true,format:'png'})})
            .setFooter({text: "By"+message.author.username,iconURL: message.author.displayAvatarURL({dynamic:true,format:'png'})})
            .setTitle("تقديم على طاقم الدعم الفني | Support Apply")
            .setDescription(`**تم فتح تقديم السبورت لخادم رويال تايم على الديسكورد وذالك باستعامل امر \`${prefix}discord-apply\`
شــروط الــتــقــديــم:
\`#1\`- عمر اكثر من 15 سنة
\`#2\`- امتلاك خبرات كافية
\`#3\`- التفاعل
**`)
            .setImage("https://cdn.discordapp.com/attachments/874704319784550480/888748327557009478/apply.png")
            .setTimestamp()
            .setColor("RANDOM")
            .setThumbnail(message.guild.iconURL({dynamic:true}))
        message.guild.channels.cache.get("945401890869501972").send({content: "هام!!!! @everyone",embeds: [Embed]})
    }
});

client.on("messageCreate" , async (message) => {
    if(message.content.startsWith(prefix+"discord-close-apply")){
        if(!supported.includes(message.author.id)) return message.channel.send({content: "**لاتستطيع استعمال هذا الامر**"})
        message.delete()
        message.guild.channels.cache.get("945401890869501972").send({content: "**تم غلق التقديم وسيتم الاعلان عن اسماء المقبولين قريبا**"})
        await db.set(`Discord-Apply[Guild:${message.guild.id}]`,"off");
    }
})


client.on("messageCreate" , async (message) => {
    if(message.content.startsWith(prefix + "discord-blacklist")){
        if(!["716717221337890886","725669950303371325","678517905150836757","604200067515154446"].includes(message.author.id)) return;
        let user = message.mentions.users.first();
        if(!user) return message.reply({content: `**${prefix}discord-blacklist [USER]**`})
        await db.set(`Discord-BlackList_${user.id}`,'on')
        message.reply({content: `**✅ Successfully added ${user} to blacklist database **`})
    }
});

client.on("messageCreate" , async (message) => {
    if(message.content.startsWith(prefix + "discord-unblacklist")){
        if(!["716717221337890886","725669950303371325","678517905150836757","604200067515154446"].includes(message.author.id)) return;
        let user = message.mentions.users.first();
        if(!user) return message.reply({content: `**${prefix}discord-unblacklist [USER]**`})
        await db.set(`Discord-BlackList_${user.id}`,'off')
        message.reply({content: `**✅ Successfully removed ${user} from blacklist database **`})
    }
});