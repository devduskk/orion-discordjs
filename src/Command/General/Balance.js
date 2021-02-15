const Command = require('../../structures/Command')
const db = require('quick.db');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['balance', 'bal'],
            enabled: true,
            description: 'Verifique a quantidade de dinheiro que você possui',
            category: 'General',
            usage: '\`balance\`',
            guildOnly: false,
            ownerOnly: false,
            nsfw: false,
            args: false,
            cooldown: 5000
        })
    }

    async run(message, args) {
  let user = message.mentions.members.first() || message.author;

  let bal = db.fetch(`money_${message.guild.id}_${user.id}`)

  if (bal === null) bal = 0;

  let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`)
  if (bank === null) bank = 0;

  let moneyEmbed = new MessageEmbed()
  .setColor("36393e")
  .setAuthor(`Balanço Monetário`)
  .setDescription(`> :coin: Dinheiro em mãos: **R$ ${bal}**\n> :credit_card: Banco: **R$ ${bank}**`);
  message.channel.send(moneyEmbed)
    }
}
