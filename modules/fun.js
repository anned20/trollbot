module.exports = [
    {
        match: new RegExp(/^ayy/i),
        value: (msg) => {
            return msg.channel.send('lmao');
        },
    },
    {
        match: new RegExp(/^!dudes\b/),
        value: (msg) => {
            return msg.channel.send('https://www.youtube.com/watch?v=VfaNCw2bF48');
        },
    },
    {
        match: new RegExp(/^!mock\b/),
        value: (msg) => {
            let text = msg.content.substr(6).toLowerCase();

            if (!text) {
                return msg.reply('Usage: !mock {text}');
            }

            let top = text;
            let bottom = '';
            if (text.includes('+')) {
                top = text.split('+')[0].trim();
                bottom = text.split('+')[1].trim();
            }

            text = text.replace(/\s+/g, '_');
            text = text.replace(/[^a-z_]/g, '');

            text = Buffer.from(`spongebob\t${top}/${bottom}`).toString('base64');

            return msg.channel.send(`https://memegen.link/_${text}.jpg`);
        },
    },
    {
        match: new RegExp(/^!avatar/),
        value: (msg) => {
            const users = msg.mentions.users;

            users.forEach((user) => {
                msg.channel.send(user.avatarURL);
            });
        },
    },
];
