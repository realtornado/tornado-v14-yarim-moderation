const Discord = require('discord.js')

module.exports = {
name: 'say',
description: '',

async execute(client, message, args) {

if (message.guild) {
if ([process.env.OWNERROLID].some(x => message.member.roles.cache.has(x))) {

const guild = message.guild;
const memberCount = guild.memberCount;
const boostedCount = guild.premiumSubscriptionCount;
const taggedCount = guild.members.cache.filter(member => member.user.bot && member.user.username.includes('TAG')).size;
const activeCount = guild.members.cache.filter(member => member.presence && member.presence.status === 'online').size;
//const onlineCount = guild.members.cache.filter(member => member.presence.status !== 'offline').size;

const tornado_embed = new Discord.EmbedBuilder()
.setColor(
process.env.MAINCOLOR
)
.setAuthor({ name: `${message.guild.name} Say Komutu`, iconURL: message.guild.iconURL({ size: 2048 }) })
.setThumbnail(
message.guild.iconURL({ size: 2048 })
)
.setDescription(
`
${client.emojis.cache.find(x => x.name == "tornado_yuvarlak2")} Sunucuda şuan toplamda **${memberCount}** üye bulunmakta
${client.emojis.cache.find(x => x.name == "tornado_yuvarlak2")} Sunucuda şuan da **${activeCount}** aktif üye bulunmakta
${client.emojis.cache.find(x => x.name == "tornado_yuvarlak2")} Sunucudaki Boost şuan **${boostedCount}** olarak gözükmekte
${client.emojis.cache.find(x => x.name == "tornado_yuvarlak2")} Taglı üye sayısı şuan **${taggedCount}** olarak gözükmekte
`
)
.setFooter({ text: `komutu isteyen şahıs: ${message.author.username}`, iconURL: message.author.avatarURL({ size: 2048 }) })
.setTimestamp()
await message.channel.send({ 
embeds: [tornado_embed]
})

} else {
message.reply({ embeds: [
new Discord.EmbedBuilder()
.setColor(process.env.ERRORCOLOR)
.setDescription(`${client.emojis.cache.find(x => x.name == "tornado_carpi")} Bu komutu sadece "**kurucular**" kullanabilir.`)
]});

}
}


},
};