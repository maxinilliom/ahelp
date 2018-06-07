exports.run = (client, message, args, level) => {
	if (args[0] == "five") return message.channel.send(`Successful attempts so far: **${client.five}**`);
	const x = max => Math.floor(Math.random() * Math.floor(max));
	if (client.fiveLast !== message.author.id && x(1000) > 995) {
		client.fiveLast = message.author.id;
		client.five++;
		if (!args[0]) {
			message.reply('Your letter was received but we\'re sad to see that there was no message.');
		} else if (args.join(" ").length <= 32) {
			message.reply('Success! Your message has been received. Now, where did I put it?');
			message.guild.members.get('212672527405678592').setNickname(`${args.join(' ')}`);
		} else {
			message.reply('I\'m sorry, your message is too long. Try again!');
		}
	}
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

