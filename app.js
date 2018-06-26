require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

client.login(process.env.DISCORD_TOKEN);

const activities = [
    {
        name: 'with your mom',
        type: 'PLAYING',
    },
    {
        name: 'dank memes',
        type: 'WATCHING',
    },
    {
        name: 'All Star',
        type: 'LISTENING',
    },
];

client.on('ready', () => {
    let activity = activities[Math.floor(Math.random() * activities.length)];

    client.user.setActivity(activity.name, {type: activity.type});
});

const loader = require('./loader')(client);
