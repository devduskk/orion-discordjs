const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['equipe', 'staff'],
            enabled: true,
            description: 'Envia uma mensagem mostrando todos os membros da nossa equipe.',
            category: 'General',
            usage: '\`equipe\`',
            guildOnly: false,
            ownerOnly: false,
            nsfw: false,
            args: false,
            cooldown: 5000
        })
    }

    async run(message, args) {
       
        let equipe = db.fetch(`setequipe_${message.guild.id}`)
        if (equipe === null) equipe = "A mensagem de todos os membros da equipe ainda não foi definida.";

        const equipeEmbed = new MessageEmbed()
            .setDescription(equipe)
            .setColor("36393e")
            .setTimestamp(new Date())

        message.channel.send(equipeEmbed)
    }
}