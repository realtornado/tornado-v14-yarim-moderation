const MesajXP = require("../database/models/MesajXP.js");

module.exports = async (client) => {
    client.on('messageCreate', async message => {
        if (message.author.bot) return;

        const authorId = message.author.id;

        try {
            let user = await MesajXP.findOne({ author: authorId });
            if (!user) {
                user = new MesajXP({
                    author: authorId,
                    xp: 0,
                    messageCount: 0,
                    channels: [{ channelId: "", channelName: "", messageCount: 0 }]
                });
            }

            const channelIndex = user.channels.findIndex(channel => channel.channelId === message.channel.id);
            if (channelIndex !== -1) {
                user.channels[channelIndex].messageCount++;
            } else {
                if (user.channels.length < 5) {
                    user.channels.push({ channelId: message.channel.id, channelName: message.channel.name, messageCount: 1 });
                } else {
                    const minCountChannelIndex = user.channels.findIndex(channel => {
                        return channel.messageCount === Math.min(...user.channels.map(channel => channel.messageCount));
                    });
                    if (user.channels[minCountChannelIndex].messageCount < 1) {
                        user.channels[minCountChannelIndex] = { channelId: message.channel.id, channelName: message.channel.name, messageCount: 1 };
                    }
                }
            }            

            user.messageCount++;

            if (user.messageCount % 10 === 0) {
                user.xp++;
            }

            await user.save();
        } catch (err) {
            console.log('Veritabanı hatası:', err);
        }
    });
}