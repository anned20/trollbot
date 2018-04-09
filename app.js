require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

client.login(process.env.DISCORD_TOKEN);

client.on('ready', () => {
    client.user.setActivity('trolling');
});

const loader = require('./loader')(client);
