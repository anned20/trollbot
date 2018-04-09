const Discord = require('discord.js');
const translate = require('google-translate-api');

module.exports = [
    {
        match: new RegExp(/^!translate/),
        value: async (msg) => {
            const toTranslate = msg.content.substr(11);

            translate(toTranslate, {to: 'en'}).then((res) => {
                const reply = new Discord.RichEmbed();

                reply
                    .setAuthor(msg.author.username, msg.author.avatarURL)
                    .addField('From', toTranslate)
                    .addField('Language', res.from.language.iso, true)
                    .addField('Translated', res.text)
                    .setFooter('Translated via Google Translate')
                    .setColor('RANDOM')
                ;

                msg.delete();
                return msg.channel.send(reply);
            });
        },
    },
];
