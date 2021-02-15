const Command = require('../../structures/Command.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['ping'],
            enabled: true,
            description: 'Realiza um cálculo para obter a latência da instância.',
            category: 'General',
            usage: '\`ping\`',
            guildOnly: false,
            ownerOnly: true,
            nsfw: false,
            args: false,
            cooldown: 5000
        })
    }

    async run(message) {
        message.channel.send(`🏓 Pooong! \`${this.client.ws.ping.toFixed(0)}ms.\``)
    }
}
