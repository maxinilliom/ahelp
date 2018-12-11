exports.run = async (client, message, args, level) => {

  if (message.guild.invite) return message.channel.send(message.guild.invite);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["inv"],
  permLevel: "User",
  guilds: [],
  cooldown: 5000
};

exports.help = {
  name: "invite",
  category: "Info",
  description: "Fetch an invite for the server.",
  usage: "invite"
};
