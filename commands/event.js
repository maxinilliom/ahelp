exports.run = async (client, message, args, level) => {

	const {data} = require('../info/eventembeds.js');
	const list = Object.getOwnPropertyNames(data);
	if (args[0] == "help") {
		return message.channel.send(list);
	}
	let inv, direction;
	const guild = message.guild;
	const content = message.content.substring(7);
	const [type, time, date, ...details] = content.split("  ");
  const [world, fc, voice] = details ? details : undefined;
	if (!type) return message.channel.send("Please specify a valid event name.");
	if (!time) return message.channel.send("Please specify a valid time.");
	if (!date) return message.channel.send("Please specify a valid date.");
	const search = type.toLowerCase();
	if (!list.includes(search)) return message.channel.send(`No guide embed exists for **${type}**. Please try again.`);
	const embed = data[search];
	embed.color = 2136831;
	if (embed.fields[0].name == "When:") embed.fields.splice(0, 1);
	const when = {
		"name": "When:",
		"value": `${time} game time on ${date}.`
	};
	embed.fields.unshift(when);
	if (world) embed.fields[1].value = embed.fields[1].value.replace("World 68", `World ${world}`);
	if (fc) embed.fields[1].value = embed.fields[1].value.replace("<@113770763261181961>", `${fc}`);
	if (voice) {
		if (!client.channels.find('name', voice)) return message.channel.send("Please specify a valid voice channel name.")
  	const vc = client.channels.find('name', voice);
  	if (guild.id == "485523397179342848" && vc.id !== "486308546661842944"
			|| guild.id == "382696689812766720" && vc.id !== "425508386713632771") {
  		//AH event posted in Alright or Alright event posted in AH
  		direction = `${vc.guild.name}'s ${vc.name}`
  	}
  	else {
  		direction = `this server's ${vc.name}`;
  	}
  	inv = await vc.createInvite({maxAge: 7200}, `${embed.author.name}.`);
		embed.fields[1].value += "Voice chat will take place in ${direction} voice channel."
	}
	//message.channel.send(`${type.toProperCase()} at ${time} on ${date} in ${guild.name} on world ${world} in ${fc} FC using ${vc.name} for voice.`);
	await message.channel.send({embed: embed});
	if (inv) message.channel.send(`Join voice here: ${inv}`);
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
  usage: "event <help/type>  <time>  <date>  [world]  [friends chat]  [voice channel]"
};