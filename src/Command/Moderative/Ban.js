const Command = require('../../structures/Command')
const { MessageEmbed } = require('discord.js');
const { promptMessage } = require("../../../functions");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['ban'],
            enabled: true,
            description: 'Comando utilizado para banir um usuário do servidor.',
            category: 'Moderative',
            usage: '\`ban\`',
            guildOnly: false,
            ownerOnly: false,
            nsfw: false,
            args: false,
            cooldown: 5000
        })
    }

    async run(message, args) {

        message.delete();

        if (!message.member.hasPermission("BAN_MEMBERS")) {
            return message.reply("você não tem permissão para utilizar este comando.")
                .then(m => m.delete(5000));
        
        }

        let Channel = message.guild.channels.cache.find(chan => chan.id === "804881923922984971");
        let Avatar = this.client.user.displayAvatarURL({ dynamic: true })

        let User = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!User) {
            return message.reply("usuário não encontrato.")
                .then(m => m.delete({timeout: 5 * 1000}));
        }

        if (User.hasPermission("BAN_MEMBERS")) return message.reply("eu não posso banir esse usuário.").then(m => m.delete({timeout: 5 * 1000}));

        message.channel.send(new MessageEmbed()
        
        .setDescription(`Selecione um motivo para que a punição possa ser aplicada ao usuário ${User}:\n\n\`#1\` - Divulgação de servidores ou links;\n\`#2\` - Conteúdo +18 em canais públicos;\n\`#3\` - Infração de um regulamento do servidor (#regras)\n\`#4\` - Outros motivos;\n\nPara aplicar a punição ao usuário, digite o ID do motivo e a punição será aplicada. Depois, basta confirmar o banimento!`)
        .setColor("36393e")).then(async (msg) => {
            await msg.delete({ timeout: 15 * 1000 })
        })

        let br1 = message.channel.createMessageCollector(a => a.author.id == message.author.id, {
            time: 60000 * 5,
            max: 1
          })

          br1.on('collect', async r => {

        if(r.content.toLowerCase() === "#1") {
            const banReason_1 = "Divulgação de servidores ou links"
            const banEmbed = new MessageEmbed()
            
            banEmbed.setAuthor(`Usuário(a) banido(a) do servidor!`, this.client.user.displayAvatarURL({ dynamic: true }), Avatar)
            banEmbed.setColor("36393e")
            banEmbed.setDescription(`\`\`\`\n- Usuário(a): ${User.user.tag} (ID: ${User.id})\n- Autor da punição: ${message.author.tag}\n- Motivo: ${banReason_1}\`\`\``)

            const promptEmbed = new MessageEmbed()
            .setColor("36393e")
            .setDescription(`Será aplicado uma punição de banimento no(a) usuário(a) ${User}, deseja confirmar?`)

        await message.channel.send(promptEmbed).then(async msg => {
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            if (emoji === "✅") {
                msg.delete();

                User.ban({ reason: banReason_1 })
                    .catch(err => {
                        if (err) return message.channel.send(`Erro: ${err}`)
                    });

                Channel.send(banEmbed);
            } else if (emoji === "❌") {
                msg.delete();

                message.reply(`banimento cancelado.`)
                    .then(m => m.delete({timeout: 5000}));
            }
        });
    }

        if(r.content.toLowerCase() === "#2") {
            const banReason_2 = "Conteúdo +18 em canais públicos"
            const banEmbed = new MessageEmbed()
            
            banEmbed.setAuthor(`Usuário(a) banido(a) do servidor!`, this.client.user.displayAvatarURL({ dynamic: true }), Avatar)
            banEmbed.setColor("36393e")
            banEmbed.setDescription(`\`\`\`\n- Usuário(a): ${User.user.tag} (ID: ${User.id})\n- Autor da punição: ${message.author.tag}\n- Motivo: ${banReason_2}\`\`\``)

            const promptEmbed = new MessageEmbed()
            .setColor("36393e")
            .setDescription(`Será aplicado uma punição de banimento no(a) usuário(a) ${User}, deseja confirmar?`)

        await message.channel.send(promptEmbed).then(async msg => {
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            if (emoji === "✅") {
                msg.delete();

                User.ban({ reason: banReason_2 })
                    .catch(err => {
                        if (err) return message.channel.send(`Erro: ${err}`)
                    });

                Channel.send(banEmbed);
            } else if (emoji === "❌") {
                msg.delete();

                message.reply(`banimento cancelado.`)
                    .then(m => m.delete({timeout: 5000}));
            }
        });
    }

        if(r.content.toLowerCase() === "#3") {
            const banReason_3 = "Infração de um regulamento do servidor (#regras)"
            const banEmbed = new MessageEmbed()
            
            banEmbed.setAuthor(`Usuário(a) banido(a) do servidor!`, this.client.user.displayAvatarURL({ dynamic: true }), Avatar)
            banEmbed.setColor("36393e")
            banEmbed.setDescription(`\`\`\`\n- Usuário(a): ${User.user.tag} (ID: ${User.id})\n- Autor da punição: ${message.author.tag}\n- Motivo: ${banReason_3}\`\`\``)

            const promptEmbed = new MessageEmbed()
            .setColor("36393e")
            .setDescription(`Será aplicado uma punição de banimento no(a) usuário(a) ${User}, deseja confirmar?`)

        await message.channel.send(promptEmbed).then(async msg => {
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            if (emoji === "✅") {
                msg.delete();

                User.ban({ reason: banReason_3 })
                    .catch(err => {
                        if (err) return message.channel.send(`Erro: ${err}`)
                    });

                Channel.send(banEmbed);
            } else if (emoji === "❌") {
                msg.delete();

                message.reply(`banimento cancelado.`)
                    .then(m => m.delete({timeout: 5000}));
            }
        });
    }

        if(r.content.toLowerCase() === "#4") {
            const banReason_4 = "Outros motivos"
            const banEmbed = new MessageEmbed()
            
            banEmbed.setAuthor(`Usuário(a) banido(a) do servidor!`, this.client.user.displayAvatarURL({ dynamic: true }), Avatar)
            banEmbed.setColor("36393e")
            banEmbed.setDescription(`\`\`\`\n- Usuário(a): ${User.user.tag} (ID: ${User.id})\n- Autor da punição: ${message.author.tag}\n- Motivo: ${banReason_4}\`\`\``)

            const promptEmbed = new MessageEmbed()
            .setColor("36393e")
            .setDescription(`Será aplicado uma punição de banimento no(a) usuário(a) ${User}, deseja confirmar?`)

        await message.channel.send(promptEmbed).then(async msg => {
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            if (emoji === "✅") {
                msg.delete();

                User.ban({ reason: banReason_4 })
                    .catch(err => {
                        if (err) return message.channel.send(`Erro: ${err}`)
                    });

                Channel.send(banEmbed);
            } else if (emoji === "❌") {
                msg.delete();

                message.reply(`banimento cancelado.`)
                    .then(m => m.delete({timeout: 5000}));
            }
        });
    }
    });
    }
}
