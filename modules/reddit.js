const Discord = require('discord.js');
const snoowrap = require('snoowrap');

const r = new snoowrap({
    userAgent: process.env.REDDIT_USERAGENT,
    clientId: process.env.REDDIT_CLIENTID,
    clientSecret: process.env.REDDIT_CLIENTSECRET,
    refreshToken: process.env.REDDIT_REFRESHTOKEN,
});

const getReply = (post) => {
    const reply = new Discord.RichEmbed();

    reply
        .setAuthor(`u/${post.author.name}`)
        .setTitle(post.title)
        .setFooter(`Subreddit: r/${post.subreddit.display_name}`)
        .setColor('RANDOM')
    ;

    if (post.url) {
        reply.setImage(post.url);
    } else {
        reply.setDescription(`https://reddit.com/${post.permalink}`)
    }

    return reply;
};

module.exports = [
    {
        match: new RegExp(/^!reddit/),
        value: async (msg) => {
            const subreddit = msg.content.substr(8);

            if (!subreddit) {
                return msg.reply('Usage: !reddit {subreddit}');
            }

            try {
                const post = await r.getSubreddit(subreddit).getRandomSubmission();

                const reply = getReply(post);

                msg.delete();
                return msg.channel.send(reply);
            } catch (e) {
                return msg.reply(`Couldn't get subreddit ${subreddit}`);
            }
        },
    },
    {
        match: new RegExp(/^!meme$/),
        value: async (msg) => {
            const subreddits = [
                'meirl',
                '2meirl4meirl',
                'memes',
                'dankmemes',
                'MemeEconomy',
                'wholesomememes',
            ];

            const subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];

            const post = await r.getSubreddit(subreddit).getRandomSubmission();

            const reply = getReply(post);

            msg.delete();
            return msg.channel.send(reply);
        },
    },
];
