const Event = require('../structures/Event');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            once: true
        })
    }

    async run() {
        console.log([
            `${this.client.user.tag} está autenticado.`,
			`Carreguei ${this.client.commands.size} comando(s): ${this.client.commands.map(cmd => cmd.name).join(', ')}`,
			`Carreguei ${this.client.events.size} evento(s): ${this.client.events.map(evt => evt.name).join(', ')}`
        ].join(`\n`));
    }
};