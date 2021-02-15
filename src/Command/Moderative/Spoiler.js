const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['spoiler'],
            enabled: true,
            description: 'Realiza um spoiler no Discord.',
            category: 'Moderative',
            usage: '\`spoiler\`',
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

        const channel = message.guild.channels.cache.find(chan => chan.id === "804881912497438750");
        const messageArgs = args.join(" ").split(" | ")

        const titleArgs = messageArgs[0];
        const descriptionArgs = messageArgs[1];
        const imageArgs = messageArgs[2];

        const spoilerEmbed = new MessageEmbed()
            .setTitle(titleArgs)
            .setDescription(descriptionArgs)
            .setColor("36393e")
            .setTimestamp(new Date())
            .setImage(imageArgs)
            .setFooter(`Spoiler enviado por: ${message.author.tag}`)

        channel.send(spoilerEmbed);

    }
}