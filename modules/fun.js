const allowed = [
    'yuno',
    'puffin',
    'grumpycat',
    'facepalm',
    'doge',
    'blb',
];

const memegen = (template, text) => {
    let top = text;
    let bottom = '';
    if (text.includes('+')) {
        top = text.split('+')[0].trim();
        bottom = text.split('+')[1].trim();
    }

    text = text.replace(/\s+/g, '_');
    text = text.replace(/[^a-z_1-9]/g, '');

    text = Buffer.from(`${template}\t${top}/${bottom}`).toString('base64');

    return `https://memegen.link/_${text}.jpg`;
};

module.exports = [
    {
        match: new RegExp(/^ayy/i),
        value: (msg) => {
            return msg.channel.send('lmao');
        },
    },
    {
        match: new RegExp(`^${process.env.PREFIX}dudes\$`),
        value: (msg) => {
            return msg.channel.send('https://www.youtube.com/watch?v=VfaNCw2bF48');
        },
    },
    {
        match: new RegExp(`^${process.env.PREFIX}mock\\b`),
        value: (msg) => {
            let text = msg.content.substr(6).toLowerCase();

            if (!text) {
                return msg.reply('Usage: !mock {text}');
            }

            return msg.channel.send(memegen('spongebob', text));
        },
    },
    {
        match: new RegExp(`^${process.env.PREFIX}genmeme\\b`),
        value: (msg) => {
            const re = new RegExp(`^${process.env.PREFIX}genmeme\\s+(\\w+)\\s+(.*)`);
            const matches = msg.content.match(re);

            if (!matches || matches.length < 3) {
                return msg.reply(`Usage: ${process.env.PREFIX}genmeme {template} {text}`);
            }

            const template = matches[1];
            const text = matches[2];

            if (!allowed.includes(template)) {
                return msg.reply('That template is either not found or not allowed.');
            }

            return msg.channel.send(memegen(template, text));
        },
    },
    {
        match: new RegExp(`^${process.env.PREFIX}avatar\\b`),
        value: (msg) => {
            const users = msg.mentions.users;

            users.forEach((user) => {
                msg.channel.send(user.avatarURL);
            });
        },
    },
];
