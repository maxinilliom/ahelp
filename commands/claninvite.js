exports.run = async (client, message, args, level) => {

  message.channel.send("https://discord.gg/KwysmXr");

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["clan", "claninv"],
  permLevel: "User",
  guilds: [],
  cooldown: 5000
};

exports.help = {
  name: "claninvite",
  category: "Information",
  description: "Fetch an invite for the Alright clan server.",
  usage: "claninvite"
};
