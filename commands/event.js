exports.run = (client, message, args, level) => {

	const {data} = require('../info/eventembeds.js');
	const list = Object.getOwnPropertyNames(data);
	if (args[0] == "help") {
		return message.channel.send(list);
	}
	const content = message.content.substring(7);
	const [type, time, date] = content.split("  ");
	if (!type) return message.channel.send("Please specify a valid event name.");
	if (!time) return message.channel.send("Please specify a valid time.");
	if (!date) return message.channel.send("Please specify a valid date.");
	const search = type.toLowerCase();
	if (!list.includes(search)) return message.channel.send(`No guide embed exists for **${type}**. Please try again.`);
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
  usage: "event <help/type>  <time>  <date>"
};
