const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js');
const superagent = require("snekfetch");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['online'],
            enabled: true,
            description: 'Verifique se o servidor está online.',
            category: 'General',
            usage: '\`online\`',
            guildOnly: false,
            ownerOnly: false,
            nsfw: false,
            args: false,
            cooldown: 5000
        })
    }

    async run(message, args) {
        superagent.get('https://api.mcsrvstat.us/2/redeorion.com')
        .end((err, response) => {

            let online1 = 'O servidor está online!'
            let offline1 = 'O servidor está offline.'

            let Status = response.body.online ? online1 : offline1

            let version1 = 'Não disponível.'
            let version2 = response.body.version

            let Versionn = response.body.version ? version2 : version1

            let online = response.body.players.online
            let maximo = response.body.players.max
            
            const onlineEmbed = new MessageEmbed()

                 .setTitle(`${message.guild.name}`)
                 .setDescription(`**Status do servidor**: ${Status}\n**Versão**: ${Versionn}\n**Jogadores**: **${online}**/**${maximo}**`)
                 .setColor("36393e")
                 .setThumbnail(`https://api.mcsrvstat.us/icon/jogar.redetwisty.tk`)
                 .setTimestamp()
                  message.channel.send(onlineEmbed)
                }).catch(O_o => {
                  message.channel.send('Não estou conseguindo sicronizar meu banco de dados com o IP, alguém colocou um IP inexistente no meu sistema.')
                })
    }
}