const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['fechar'],
            enabled: true,
            description: 'Fecha o canal de atendimento.',
            category: 'Moderative',
            usage: '\`fechar\`',
            guildOnly: false,
            ownerOnly: false,
            nsfw: false,
            args: false,
            cooldown: 5000
        })
    }

    async run(message, args) {

        message.delete();

        if(!message.member.hasPermission("MANAGE_CHANNELS"))return message.channel.send("Permissão insuficiente.")
        message.channel.send("Você tem certeza que deseja fechar este canal? Se sim, digita \`fechar\`").then((m)=>{
            message.channel.awaitMessages(response => response.content == "fechar",{
                max: 1,
                time: 5000,
                errors: ['time']
            }).then(()=>{
                message.channel.delete()
            }).catch(()=>{
                m.edit("Ocorreu um erro ao tentar excluir este canal!")
            });
        });
    }
}