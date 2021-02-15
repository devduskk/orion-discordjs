const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['mutar'],
            enabled: true,
            description: 'Silencia um usuário temporariamente.',
            category: 'Moderative',
            usage: '\`mutar\`',
            guildOnly: false,
            ownerOnly: false,
            nsfw: false,
            args: false,
            cooldown: 5000
        })
    }

    async run(message, args) {
        let channel = message.guild.channels.cache.find(chan => chan.id === "804881923922984971");

        message.delete();
if(!message.member.hasPermission("BAN_MEMBERS") || !message.guild.owner) return message.channel.send("Você não tem permissão para utilizar este comando.");
if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("Eu preciso da permissão de gerenciar cargos para poder executar o comando.")
 
        let Member = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
      if (!Member) return message.channel.send(`Por favor, mencione um usuário!`);
      
      let User = message.guild.member(Member);
      
          if (Member.id === message.author.id)
      return message.channel.send(`Você não pode se silenciar.`);
      
          if (!User)
      return message.channel.send(
        `Por favor, mencione o usuário que deseja silenciar.`
      );
      
      if (Member.id === message.guild.owner.user.id)
      return message.channel.send(`Você não pode silenciar o dono do servidor!`);
  
  if (Member.hasPermission("BAN_MEMBERS")) return message.channel.send("Eu não posso silenciar este usuário!");
  
      let Role = message.guild.roles.cache.find(role => role.name === "Silenciado").id;
  
          let tempmuteUser = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
        if (!tempmuteUser && args[0]) {
            message.channel.send("Não foi possível encontrar este usuário.");
            return;
        }
       let Reason = args.slice(2).join(" ");
            let tempmuteTime = args[1];
            if (!tempmuteTime) return message.channel.send('Por favor, coloque um tempo em dias (d), horas (h), minutos (m) ou segundos (s).');
          
          const tempembed = new MessageEmbed()
          .setAuthor("Uma nova punição foi enviada!")
          .addField('Autor da punição', `${message.author.tag} ${message.author.id}`)
          .addField(`Usuário`, `${Member.user.tag} ${Member.id}`)
          .addField('Tempo', `${tempmuteTime}`)
          .addField('Motivo', `${Reason || "Nenhum motivo especificado."}`)
          .setColor("BLUE")
          .setFooter(`Requested by ${message.author.username}`)
          .setTimestamp();
          
              if (Role && !Member.roles.cache.has(Role)) {
      Member.roles.add([Role]);
      channel.send(tempembed);
    } else {
      return message.channel.send(`Este usuário já está mutado!`);
    }
          
            setTimeout(() => {

                Member.roles.remove([Role]);
                channel.send(`${tempmuteUser} foi desmutado.`);

            }, ms(tempmuteTime));
    }
}