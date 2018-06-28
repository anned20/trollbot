const Discord = require('discord.js');
const google = require('google');

module.exports = [
    {
        match: new RegExp(`^${process.env.PREFIX}google\\b`),
        value: (msg) => {
            const toSearch = msg.content.substr(8);

            google(toSearch, (err, res) => {
                if (err) {
                    console.error(err);

                    msg.reply('Something went wrong');
                }

                const reply = new Discord.RichEmbed();

                reply
                    .setAuthor(msg.author.username, msg.author.avatarURL)
                    .setTitle(res.links[0].title)
                    .setDescription(res.links[0].description)
                    .setURL(res.links[0].href)
                ;

                msg.delete();
                return msg.channel.send(reply);
            });
        },
    }
];
