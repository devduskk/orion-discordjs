const Command = require('../../structures/Command.js');
const { MessageEmbed, Client } = require('discord.js');
const client = new Client();
const yml = require('../../../configurations/yml');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['ticket'],
            enabled: true,
            description: 'Envia a mensagem de ticket ao canal.',
            category: 'Moderative',
            usage: '\`ticket\`',
            guildOnly: false,
            ownerOnly: false,
            nsfw: false,
            args: false,
            cooldown: 5000
        })
    }

    async run(message, args) {
        let config = await yml('./config.yml');

        message.delete();

        if (!message.member.hasPermission('ADMINISTRATOR')) {
            message.reply('Apenas aqueles que possuem a permissão **ADMINISTRADOR** podem utilizar este comando.')
        }

        var channel = message.guild.channels.cache.find(chan => chan.id === config.attendanceID);

        var ticketEmbed = new MessageEmbed()
            .setAuthor("Área de atendimento ao usuário.")
            .setDescription(`Clique no emoji abaixo para ser redirecionado a criação de seu ticket, o atendimento será realizado por meio de suas mensagens em um canal privado entre você e a nossa equipe.`)
            .setColor("36393e")
            .setImage("https://i.imgur.com/JO5V3i3.png")

        channel.send(ticketEmbed).then(async (msg) => {
            await msg.react('❓');

            client.on('messageReactionAdd', (reaction, user) => {
                const member = message.guild.members.cache.get(user.id)
                if (reaction.emoji.name === '❓' && user.id === member.id) {
                    reaction.users.remove(user.id)

                    const name = `ticket-${user.username}`;
                    if (message.guild.channels.cache.find(ch => ch.name == name.toLowerCase())) {
                        user.send(`:wave: Olá, ${user}! Antes de você criar outro canal de atendimento, encerre o que está aberto atualmente.`).then(async (msg) => {
                            await msg.delete({timeout: 5 * 1000})
                        })
                    } else {

                        var categoryID = "790728205585219587"

                        message.guild.channels.create(name, 'text').then((chan) => {
                            chan.setParent(categoryID).then((settedparent) => {
                                settedparent.updateOverwrite(message.guild.roles.everyone, {
                                    SEND_MESSAGES: false,
                                    VIEW_CHANNEL: false
                                })
                                settedparent.updateOverwrite(user, {
                                    SEND_MESSAGES: true,
                                    VIEW_CHANNEL: true,
                                    ATTACH_FILES: true,
                                    EMBED_LINKS: true
                                });
                            });
                            chan.send(new MessageEmbed()
                                .setDescription(`Olá, ${user}! Seja bem-vindo(a) ao atendimento do **Orion**. Envie a sua dúvida ou o que deseja abaixo para agilizar o seu atendimento.\n\n**Dados do Usuário:**\n\n> Discord: \`${user.tag}\`\n> ID: \`${user.id}\``)
                                .setColor("36393e")
                                .setAuthor(`Categoria selecionada: Geral.`));
                        });
                    }
                }
            });
        });
    }
}
