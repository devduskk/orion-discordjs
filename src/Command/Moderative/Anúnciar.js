const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['anúnciar', 'anúncio'],
            enabled: true,
            description: 'Realiza um anúncio no Discord.',
            category: 'Moderative',
            usage: '\`anúnciar\`',
            guildOnly: false,
            ownerOnly: false,
            nsfw: false,
            args: false,
            cooldown: 5000
        })
    }

    async run(message, args) {

        if(message.deletable) {
            message.delete();
        }

        if (!message.member.hasPermission('ADMINISTRATOR')) {
            message.reply('Apenas aqueles que possuem a permissão **ADMINISTRADOR** podem utilizar este comando.')
        }

        const channel = message.guild.channels.cache.find(chan => chan.id === "804881911603920906");
        const messageArgs = args.join(" ").split(" | ");
	const title = messageArgs[0];
	const desc = messageArgs[1];

        const announceEmbed = new MessageEmbed()
	    .setTitle(title)
            .setDescription(desc)
            .setColor("36393e")
            .setTimestamp(new Date())
            .setFooter(`Mensagem enviada por: ${message.author.tag}`)

        channel.send(announceEmbed);

    }
}