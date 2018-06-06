exports.run = (client, message, args, level) => {
	if (args[0] == "five") return message.channel.send(`Successful attempts so far: **${client.five}**`);
	const x = max => Math.floor(Math.random() * Math.floor(max));
	if (x(1000) > 997 || message.author.id == '97928972305707008') message.channel.send('<:grats:383025290927931394>');
	client.five++;
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User",
  guilds: []
};

exports.help = {
  name: "five",
  category: "Miscellaneous",
  description: "?",
  usage: "???"
};

