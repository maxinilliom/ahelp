exports.run = (client, message, args, level) => {

	const {data} = require('../info/eventembeds.js');
	if (!args[0]) return message.channel.send("Please specify a valid event name.");
	const [command, type, time, date] = message.content.split("  ");
	const search = type.toLowerCase();
	if (!Object.getOwnPropertyNames(data).includes(search)) return message.channel.send(`No guide embed exists for **${type}**. Please try again.`);
	if (!time) return message.channel.send("Please specify a valid time.");
	if (!date) return message.channel.send("Please specify a valid date.");
	const embed = data[search];
	embed.color = 2136831;
	embed.timestamp = new Date();
	const when = {
		"name": "When:",
		"value": `${time} game time on ${date}.`
	};
	embed.fields.unshift(when);
	message.channel.send({embed: embed});
	message.delete();


};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator",
  guilds: []
};

exports.help = {
  name: "event",
  category: "Information",
  description: "Post an embed for an upcoming event.",
  usage: "event <type> <time> <date>"
};
