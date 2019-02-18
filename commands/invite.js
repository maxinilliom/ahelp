exports.run = async (client, message, args, level) => {

  if (message.guild.id == "382696689812766720") return message.channel.send("https://discord.gg/uUUMPbd");
  if (message.guild.id == "485523397179342848") return message.channel.send("https://discord.gg/KwysmXr");

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
  category: "Information",
  description: "Fetch an invite for the server.",
  usage: "invite"
};
