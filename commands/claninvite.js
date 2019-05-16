exports.run = async (client, message, args, level) => {

  message.channel.send("https://discord.gg/hDfHXTJ");

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["clan", "claninv"],
  permLevel: "User",
  guilds: ["382696689812766720", "485523397179342848"],
  cooldown: 5000
};

exports.help = {
  name: "claninvite",
  category: "Information",
  description: "Fetch an invite for the Alright clan server.",
  usage: "claninvite"
};
