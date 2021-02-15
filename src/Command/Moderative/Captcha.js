const Command = require('../../structures/Command.js');
const { MessageEmbed, Client } = require('discord.js');
const client = new Client();

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['captcha'],
            enabled: true,
            description: 'Envia a mensagem de captcha.',
            category: 'Moderative',
            usage: '\`captcha\`',
            guildOnly: false,
            ownerOnly: false,
            nsfw: false,
            args: false,
            cooldown: 5000
        })
    }

    async run(message) {

        if(message.deletable) {
            message.delete();
        }

        if (!message.member.hasPermission('ADMINISTRATOR')) {
            message.reply('Apenas aqueles que possuem a permissão **ADMINISTRADOR** podem utilizar este comando.')
        }

        const channel = message.guild.channels.cache.find(chan => chan.id === "808810665480290394");
        const role = message.guild.roles.cache.find(rol => rol.name === "Membro");

        const captchaEmbed = new MessageEmbed()

        captchaEmbed.setAuthor("Sistema de Verificação")
        captchaEmbed.setColor("36393e")
        captchaEmbed.setDescription(`Olá, seja muito bem-vindo(a) ao Discord Oficial da Rede Orion! Aqui, você pode ficar por dentro de todas as atualizações e novidades sobre o servidor, além de se divertir com os seus amigos em nosso Discord.\n\n\`\`\`Para você liberar o acesso aos outros canais, você precisa completar esta verificação. Nós utilizamos esse sistema para deixar o nosso servidor mais seguro, tanto para nós quanto para vocês!\`\`\`\n\nÉ bem simples! Basta clicar no emoji abaixo e você terá acesso a todos os canais do nosso Discord.`)
    
        channel.send(captchaEmbed).then(async (msg) => {
            await msg.react('🔸');

            this.client.on('messageReactionAdd', (reaction, user) => {
                const member = message.guild.members.cache.get(user.id)
                if (reaction.emoji.name === '🔸' && user.id === member.id) {
                    reaction.users.remove(user.id)
                    member.roles.add(role.id)
                };
            });
        });
    }
}