const Discord = require('discord.js')

module.exports = {
name: 'me',
description: '',

async execute(client, message, args) {

if ([process.env.BOTCOMMANDROLID].some(x => message.member.roles.cache.has(x))) {

const tornado_embed = new Discord.EmbedBuilder()
.setColor(
process.env.MAINCOLOR
)
.setThumbnail(
message.guild.iconURL({ size: 2048 })
)
.setDescription(
`${client.emojis.cache.find(x => x.name == "tornado_bilgi")} **\`${message.author.username}\`** adlı yetkilinin toplam bilgileri aşağıdadır.`
)
.addFields(
/*
{
name: ``,
value: ``,
inline: true
},
*/
{
    name: `❯ Toplam Mesajın`,
    value: `\`\`\`yaml\n0\`\`\``,
    inline: true
},
{
    name: `❯ Toplam Ses Saatin`,
    value: `\`\`\`yaml\n0\`\`\``,
    inline: true
},
{
    name: `❯ Toplam Davetin`,
    value: `\`\`\`yaml\n0\`\`\``,
    inline: true
},
{
    name: `${client.emojis.cache.find(x => x.name == "tornado_channel")} En Aktif Olduğun 3 Metin Kanalı:`,
    value: `\`❯ Kanal İsmi         :\` **Toplam Mesaj**
    \`❯ Kanal İsmi         :\` **Toplam Mesaj**
    \`❯ Kanal İsmi         :\` **Toplam Mesaj**`,
    inline: false
},
{
    name: `${client.emojis.cache.find(x => x.name == "tornado_voice")} En Aktif Olduğun 3 Ses Kanalı:`,
    value: `\`❯ Kanal İsmi         :\` **Toplam Saat**
    \`❯ Kanal İsmi         :\` **Toplam Saat**
    \`❯ Kanal İsmi         :\` **Toplam Saat**`,
    inline: false
},
{
    name: `${client.emojis.cache.find(x => x.name == "tornado_kupa2")} Sunucudaki Sıralamaların:`,
    value: `\`\`\`HTTP\nMesaj Sıralaması: #Sıralama (Toplam Mesaj)
Ses Sıralaması: #Sıralama (Toplam Saat)
Kamera Sıralaması: #Sıralama (Toplam Saat)
Yayın Sıralaması: #Sıralama (Toplam Saat)\`\`\``,
    inline: true
},
)
await message.channel.send({ 
embeds: [tornado_embed]
})

}

},
};