exports.run = (client, message, args, level) => {

	const clue = require('../clues.js');
	const clues = Object.keys(clue);
	const chan = client.channels.get('455076075030970368');
	let i = 0;
	clues.forEach(c => {
		message.channel.send(`${i}. ${clue[c][0]}`)
		.then((message) => {
			setTimeout(message.edit(`${i}. ${clue[c][0]}\n${clue[c][1]}`), 30 * 1000)
		})
		i++;
	});

};

exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner",
  guilds: []
};

exports.help = {
  name: "event",
  category: "Events",
  description: "x",
  usage: "event"
};
