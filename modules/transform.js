module.exports = [
    {
        match: new RegExp(/^!a\b/),
        value: (msg) => {
            msg.delete();
            const toTransform = msg.content.substr(3);

            let chars = toTransform.split('');
            chars = chars.map((char) => {
                if (char.toLowerCase().match(/[a-z]/)) {
                    char = char.toLowerCase();
                    return `:regional_indicator_${char}:`;
                }

                return char;
            });

            return msg.reply(chars.join(''));
        },
    }
];
