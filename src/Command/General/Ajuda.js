const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js');
const pagination = require('discord.js-pagination');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['ajuda'],
            enabled: true,
            description: 'Envia a mensagem de ajuda ao canal.',
            category: 'General',
            usage: '\`ajuda\`',
            guildOnly: false,
            ownerOnly: false,
            nsfw: false,
            args: false,
            cooldown: 5000
        })
    }

    async run(message, args) {
        const stEmbed = new MessageEmbed()

        stEmbed.setAuthor(`Aqui estão listados todos os comandos públicos.`)
        stEmbed.setDescription("\`/ajuda\` - Veja todos os comandos que eu tenho;\n\`/balance\` - Para verificar o seu balanço monetário;\n\`/deposit\` - Para depositar um dinheiro ao seu banco;\n\`/equipe\` - Veja todos os membros da nossa equipe;\n\`/online\` - Verifique a quantidade de jogadores online no servidor;\n\`/ping\` - Veja a minha latência atualmente;\n\`/work\` - Para realizar um trabalho e ganhar dinheiro.")
        stEmbed.setColor("36393e")

        const ndEmbed = new MessageEmbed()

        ndEmbed.setAuthor(`Aqui estão listados todos os comandos de administrador.`)
        ndEmbed.setDescription("\`/anúnciar\` - Faça um anúncio no Discord;\n\`/ban\` - Aplique uma punição de banimento em um usuário;\n\`/mutar\` - Aplique uma punição de silenciamento em um usuário;\n\`/captcha\` - Envia a mensagem de captcha ao canal especificado;\n\`/enquete\` - Faça uma votação no Discord;\n\`/fechar\` - Fecha um canal de atendimento;\n\`/setequipe\` - Seta a mensagem do comando /equipe;\n\`/spoiler\` - Envia um spoiler para os usuários em um canal;\n\`/ticket\` - Envia a mensagem de atendimento ao canal especificado;")
        ndEmbed.setColor("36393e")

        const embedList = [
            stEmbed,
            ndEmbed
        ]

        const emojiList = ['⏪', '⏩'];
        const timeout = 120000;

        pagination(message, embedList, emojiList, timeout);

    }
}