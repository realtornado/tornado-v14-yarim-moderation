const Discord = require('discord.js')
const MesajxpDB = require("../../../database/models/MesajXP.js");
const Invite = require('../../../database/models/InvıteCreate.js');
const voiceXP = require("../../../database/models/VoiceXP.js");
const moment = require('moment')

module.exports = {
name: 'me',
description: '',

async execute(client, message, args) {

if (message.guild) {
if ([process.env.BOTCOMMANDROLID].some(x => message.member.roles.cache.has(x))) {

const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
const authorId = message.author.id;
let MesajXP = await MesajxpDB.findOne({ author: authorId });

function formatTopTextChannels(channels) {
let formattedChannels = '';
channels.forEach((channel, index) => {
const channelName = message.guild.channels.cache.get(channel.channelId)?.name || 'Bilinmeyen Kanal';
const channelNameWithSpaces = channelName.padEnd(25);
formattedChannels += `\`❯ ${channelNameWithSpaces}:\` (**${channel.messageCount} Mesaj**)\n`;
});
return formattedChannels;
}

const topChannels = MesajXP.channels || [];

async function findTopVoiceChannels(guildID, userID, count = 5) {
    const userVoiceDB = await voiceXP.find({ guildID, userID });

    const channelTimes = {};
    userVoiceDB.forEach(entry => {
        if (!channelTimes[entry.channelName]) {
            channelTimes[entry.channelName] = 0;
        }
        channelTimes[entry.channelName] += Number(entry.timestamp);
    });

    const topChannels = Object.entries(channelTimes)
        .sort(([, timeA], [, timeB]) => timeB - timeA)
        .slice(0, count)
        .map(([channel, time]) => ({ channel, time }));

    return topChannels;
}

const topVoiceChannels = await findTopVoiceChannels(message.guild.id, member.id, 5);
const formattedTopVoiceChannels = topVoiceChannels.map(({ channel, time }, index) => {
    const channelNameWithSpaces = channel.padEnd(23);
    return `\`❯ ${index + 1}. ${channelNameWithSpaces}:\` (**${time} Dakika**)\n`;
}).join('');

const Active2 = await voiceXP.findOne({ guildID: message.guild.id, userID: member.id });

const tornado_embed = new Discord.EmbedBuilder()
.setColor(
process.env.MAINCOLOR
)
.setThumbnail(
message.guild.iconURL({ size: 2048 })
)
.setDescription(
`${client.emojis.cache.find(x => x.name == "tornado_bilgi")} <@${message.author.id}> adlı (${member?.roles?.highest}) yetkilinin toplam bilgileri aşağıdadır.`
)
.addFields(
{
    name: `❯ Toplam Mesajın`,
    value: `\`\`\`yaml\n    ${MesajXP ? MesajXP.messageCount : "0"} Mesaj\`\`\``,
    inline: true
},
{
    name: `❯ Toplam Ses Saatin`,
    value: `\`\`\`yaml\n     ${Active2 ? Active2.timestamp : "0"} Dakika\`\`\``,
    inline: true
},
{
    name: `${client.emojis.cache.find(x => x.name == "tornado_channel")} En Aktif Olduğun 5 Metin Kanalı:`,
    value: `${formatTopTextChannels(topChannels)}`,
    inline: false
},
{
    name: `${client.emojis.cache.find(x => x.name == "tornado_voice")} En Aktif Olduğun 5 Ses Kanalı:`,
    value: `${formattedTopVoiceChannels}`,
    inline: false
}
)
.setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ size: 2048 }) })
.setTimestamp()
await message.channel.send({ 
embeds: [tornado_embed]
})

}
}
}
}