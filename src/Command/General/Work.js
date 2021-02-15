const Command = require('../../structures/Command')
const db = require('quick.db');
const ms = require('parse-ms');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['work'],
            enabled: true,
            description: 'Realiza um trabalho para receber dinheiro.',
            category: 'General',
            usage: '\`work\`',
            guildOnly: false,
            ownerOnly: false,
            nsfw: false,
            args: false,
            cooldown: 5000
        })
    }

    async run(message) {
    let user = message.author;
    let author = await db.fetch(`work_${message.guild.id}_${user.id}`)

    let timeout = 1500000;

    if (author !== null && timeout - (Date.now() - author) > 0) {
        let time = ms(timeout - (Date.now() - author));

        let timeEmbed = new MessageEmbed()
        .setColor("36393e")
        .setDescription(`**HEY!!** Espere um tempo para trabalhar novamente, você está muito cansado(a).\n> ⏰ Tempo: **${time.minutes}m** **${time.seconds}s** `);
        message.channel.send(timeEmbed)
      } else {

        let replies = ['Programador','Construtor','Escritor','Astronauta','Chefe de Cozinha','Mecânico','Policial','Designer','Agricultor','Vendedor','Ator/Atriz']

        let result = Math.floor((Math.random() * replies.length));
        let amount = Math.floor(Math.random() * 500) + 1;
        let embed1 = new MessageEmbed()
        .setColor("36393e")
        .setDescription(`> Você trabalhou como **${replies[result]}** e recebeu:\n> :coin: **R$ ${amount}**`);
        message.channel.send(embed1)

        db.add(`money_${message.guild.id}_${user.id}`, amount)
        db.set(`work_${message.guild.id}_${user.id}`, Date.now())
    };
    }
}
