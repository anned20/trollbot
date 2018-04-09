module.exports = [
    {
        match: new RegExp(/^!dudes/),
        value: (msg) => {
            return msg.reply('https://www.youtube.com/watch?v=VfaNCw2bF48');
        },
    },
    {
        match: new RegExp(/^!mock/),
        value: (msg) => {
            msg.delete();
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
];
