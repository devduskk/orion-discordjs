const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['enquete', 'votação'],
            enabled: true,
            description: 'Realiza uma enquete no Discord.',
            category: 'Moderative',
            usage: '\`enquete\`',
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

        const channel = message.guild.channels.cache.find(chan => chan.id === "804881913206145076");
        const messageArgs = args.join(" ");

        const enqueteEmbed = new MessageEmbed()
            .setDescription(messageArgs)
            .setColor("36393e")
            .setTimestamp(new Date())
            .setFooter(`Enquete enviada por: ${message.author.tag}`)

        channel.send(enqueteEmbed).then(async (msg) => {
            await msg.react('807405287329366057');
            await msg.react('07405313569062923');
        });
    }
}