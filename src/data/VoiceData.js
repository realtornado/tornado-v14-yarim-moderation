const moment = require('moment');
const Discord = require('discord.js')
require("moment-duration-format");
const VoiceXP = require('../database/models/VoiceXP.js');

module.exports = (client) => {
    const userJoinTimes = new Map();
    const userTotalVoiceTime = new Map();

    client.on('voiceStateUpdate', async (oldState, newState) => {
        const member = newState.member;
        const guildId = newState.guild.id;

        if (!member.user.bot && newState.channel) {
            userJoinTimes.set(member.id, moment());
        }

        if (!member.user.bot && oldState.channel && !newState.channel) {
            const userId = member.id;
            const joinTime = userJoinTimes.get(member.id);
            const leaveTime = moment();
            const durationInMinutes = leaveTime.diff(joinTime, 'minutes');

            // Kullanıcı en az 1 dakika geçirdiyse
            if (durationInMinutes >= 1) {
                const totalVoiceTime = userTotalVoiceTime.get(userId) + durationInMinutes;
                userTotalVoiceTime.set(userId, totalVoiceTime);
                const voiceXPData = await VoiceXP.findOneAndUpdate(
                    { guildID: guildId, userID: userId, channelName: oldState.channel.name },
                    { $inc: { timestamp: durationInMinutes } },
                    { upsert: true, new: true }
                );
                await voiceXPData.save();
            }

            if (userTotalVoiceTime.has(userId)) {
                const totalVoiceTime = userTotalVoiceTime.get(userId);
                userTotalVoiceTime.set(userId, totalVoiceTime + durationInMinutes);
            } else {
                userTotalVoiceTime.set(userId, durationInMinutes);
            }

            const voiceXPData = await VoiceXP.findOneAndUpdate(
                { guildID: guildId, userID: userId, channelName: oldState.channel.name },
                { $inc: { timestamp: durationInMinutes } },
                { upsert: true, new: true }
            );
            await voiceXPData.save();
        }
    });
};
