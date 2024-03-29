const Discord = require('discord.js')
const moment = require("moment");
moment.locale("tr");

module.exports = (client) => {

client.on('voiceStateUpdate', (oldState, newState) => {

const channel = client.channels.cache.find(x => x.name == "voice-log");
const member = newState.member;

if (!channel) return;

if (!oldState.channel && newState.channel) {

channel.send({ embeds: [
new Discord.EmbedBuilder()
.setColor(
process.env.ACCEPTCOLOR
)
.setDescription(
`${client.emojis.cache.find(x => x.name == "tornado_voice")} (${member} | **${member.user.username}**) adlı kullanıcı bir sese katıldı!

${client.emojis.cache.find(x => x.name == "tornado_isaret")} katıldığı ses kanalı (${newState.channel} | **${newState.channel.id}**) olarak gözükmekte
${client.emojis.cache.find(x => x.name == "tornado_isaret")} katıldığı zaman (<t:${Math.floor(Date.now() / 1000)}:R>) olarak gözükmekte`
)
]})

} else if (oldState.channel && !newState.channel) {

const channel = client.channels.cache.find(x => x.name == "voice-log");
const member = newState.member;

channel.send({ embeds: [
new Discord.EmbedBuilder()
.setColor(
process.env.ERRORCOLOR
)
.setDescription(
`${client.emojis.cache.find(x => x.name == "tornado_voice")} (${member} | **${member.user.username}**) adlı kullanıcı bir sesten ayrıldı!
        
${client.emojis.cache.find(x => x.name == "tornado_isaret")} ayrıldığı ses kanalı (${oldState.channel} | **${oldState.channel.id}**) olarak gözükmekte
${client.emojis.cache.find(x => x.name == "tornado_isaret")} ayrıldığı zaman (<t:${Math.floor(Date.now() / 1000)}:R>) olarak gözükmekte`
)
]})

} else if (oldState.channel && newState.channel && (oldState.mute !== newState.mute || oldState.deaf !== newState.deaf)) {

const channel = client.channels.cache.find(x => x.name == "voice-log");
const member = newState.member;
    
channel.send({ embeds: [
new Discord.EmbedBuilder()
.setColor(
process.env.ERRORCOLOR
)
.setDescription(
`${client.emojis.cache.find(x => x.name == "tornado_voice")} (${member} | **${member.user.username}**) adlı kullanıcı mikrofonunu veya kulaklığını açıp kapattı!
            
${client.emojis.cache.find(x => x.name == "tornado_isaret")} Ses durumu: Mikrofon: **${newState.mute ? 'Kapalı' : 'Açık'}**, Kulaklık: **${newState.deaf ? 'Kapalı' : 'Açık'}**
${client.emojis.cache.find(x => x.name == "tornado_isaret")} Güncelleme zamanı: (<t:${Math.floor(Date.now() / 1000)}:R>)`
)
]})

}

});
};
