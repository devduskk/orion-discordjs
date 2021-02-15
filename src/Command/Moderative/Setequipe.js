const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['setequipe', 'setstaff'],
            enabled: true,
            description: 'Seta a mensagem dos membros da equipe.',
            category: 'Moderative',
            usage: '\`setequipe\`',
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

        const messageArgs = args.join(" ")

        db.set(`setequipe_${message.guild.id}`, messageArgs)

        message.channel.send(`A mensagem foi setada com sucesso!`).then(async (msg) => {
            await msg.delete({ timeout: 5 * 1000 })
        });
    }
}