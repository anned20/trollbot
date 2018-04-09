module.exports = (client) => {
    let triggers = [];

    const normalizedPath = require('path').join(__dirname, 'modules');

    require('fs').readdirSync(normalizedPath).forEach((file) => {
        const module = require('./modules/' + file);
        triggers = triggers.concat(module);
    });

    client.on('message', (msg) => {
        triggers.forEach((trigger) => {
            if (msg.content.match(trigger.match)) {
                return trigger.value(msg);
            }
        });
    });
}
