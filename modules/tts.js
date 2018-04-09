const googleTTS = require('google-tts-api');
const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const urlParse  = require('url').parse;

const downloadFile = (url, dest) => {
    return new Promise((resolve, reject) => {
        const info = urlParse(url);
        const httpClient = info.protocol === 'https:' ? https : http;
        const options = {
            host: info.host,
            path: info.path,
        };

        httpClient.get(options, function(res) {
            // check status code
            if (res.statusCode !== 200) {
                reject(new Error('request to ' + url + ' failed, status code = ' + res.statusCode + ' (' + res.statusMessage + ')'));
                return;
            }

            const file = fs.createWriteStream(dest);
            file.on('finish', function() {
                file.close(resolve);
            });
            file.on('error', function (err) {
                fs.unlink(dest);
                reject(err);
            });

            res.pipe(file);
        })
            .on('error', function(err) {
                reject(err);
            })
            .end();
    });
}

module.exports = [
    {
        match: new RegExp(/^!tts/),
        value: async (msg) => {
            if (!msg.guild) return;

            try {
                if (!msg.member.voiceChannel) {
                    return msg.reply('You need to join a voice channel first!');
                }

                let toTTS = msg.content.substr(5);

                let lang = 'en';
                if (langMatches = toTTS.match(/^\((.*)\)/)) {
                    toTTS = toTTS.replace(langMatches[0], '');
                    lang = langMatches[1];
                }

                if (!toTTS) {
                    return msg.reply('Usage: !tts {message}');
                }

                if (toTTS.length > 200) {
                    return msg.reply('Message should be shorter than 200 characters');
                }

                // Download TTS mp3
                const connection = await msg.member.voiceChannel.join()
                if (connection.speaking) {
                    msg.reply('Already speaking, please wait.');
                    return;
                }

                const url = await googleTTS(toTTS, lang, 1)
                const dest = path.resolve('./tts.mp3');
                await downloadFile(url, dest);

                // Play TTS
                const dispatcher = await connection.playFile(dest);

                dispatcher.on('end', () => {
                    msg.member.voiceChannel.leave()
                });
            } catch (e) {
                await msg.member.voiceChannel.leave()
                return msg.reply(`Oh snap!\n Error: \`\`\`${e.message}\`\`\``);
            }
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
