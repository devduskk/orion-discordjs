const { Client, Collection, Permissions } = require('discord.js');
const Util = require('./Util');

module.exports = class OrionClient extends Client {

	constructor(options = {}) {
		super({
			disableMentions: 'everyone'
		});
		this.validate(options);

		this.commands = new Collection();
		this.aliases = new Collection();
		this.events = new Collection();
		this.utils = new Util(this);

        this.owners = options.owners;
        this.cooldown = new Set();

	}

	validate(options) {
		if (typeof options !== 'object') throw new TypeError('As opções devem ser um tipo de Objeto.');

		if (!options.token) throw new Error('Você precisa passar o TOKEN para o bot.');
		this.token = options.token;

		if (!options.prefix) throw new Error('Você precisa passar o PREFIX para o bot.');
		if (typeof options.prefix !== 'string') throw new TypeError('O prefixo deve ser um tipo de String.');
        this.prefix = options.prefix;
	}

	async start(token = this.token) {
		this.utils.loadCommands();
		this.utils.loadEvents();
		super.login(token);
	}

};
