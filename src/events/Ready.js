const { Collection, ActivityType } = require("discord.js")
const fs = require("fs")
const Discord = require("discord.js");
    
module.exports = (client) => {
    client.on('ready', () => {
        setInterval(() => {
            client.user.setActivity(`${process.env.READY}`);
        }, 5000);
        console.log(`Bot Durum Aktif.`);
    });
};

