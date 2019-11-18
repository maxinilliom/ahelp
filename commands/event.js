exports.run = async (client, message, args, level) => {

  // Load event embeds
	const {data} = require('../info/eventembeds.js');

  // Populate list of embeds
	const list = Object.getOwnPropertyNames(data);

  // Ensure only title embeds are listed (no pt2, pt3, etc.)
	const helpArr = [];
	list.forEach(e => {
		if (!/\bpt\d/.test(e)) helpArr.push(e);
	});

  // "Help" argument will list valid embeds to channel
	if (args[0] == "help") {
		return message.channel.send(helpArr);
	}

  // Sort data into information
	const guild = message.guild;
	const content = message.content.substring(7);
	const [type, time, date, host, ...details] = content.split("  ");
  const [world, fc, voice] = details ? details : undefined;

  // Check for mandatory information and return if not submitted
	if (!type) return message.channel.send("Please specify a valid event name.");
	if (!time) return message.channel.send("Please specify a valid time.");
	if (!date) return message.channel.send("Please specify a valid date.");
  if (!host) return message.channel.send("Please specify the host(s) name(s).");

  // Search event embeds for submitted embed name
	const search = type.toLowerCase();
	if (!list.includes(search)) return message.channel.send(`No guide embed exists for **${type}**. Please try again.`);

  // Load embed and set colour
	const embed = data[search];
	embed.color = 2136831;

  // Remove "When" field if already existing and place new "When" field at top of embed
	if (embed.fields[0].name == "When:") embed.fields.splice(0, 1);
	const when = {
		"name": "When:",
		"value": `${time} game time on ${date}.`
	};
	embed.fields.unshift(when);

  // Remove "Who" field if already existing and place new "Who" field as third field of embed
  if (embed.fields[2].name == "Who:") embed.fields.splice(2, 1);
  const who = {
    "name": "Who:",
    "value": host
  }
  embed.fields.splice(2, 0, who)

  // Replace default world and/or FC values if custom values submitted
  const where = embed.fields[1].value;
	if (world) embed.fields[1].value = embed.fields[1].value.replace("{{world}}", world.match(/\d{1,3}/)[0]);
	if (fc) embed.fields[1].value = embed.fields[1].value.replace("{{fc}}", fc);

  // Send embed to channel the command is being used in
	await message.channel.send({embed: embed});

  // If it's a multi-part event embed send the second part
	if (data[`${search} pt2`]) {
		const second = data[`${search} pt2`];
		second.color = 2136831;
		await message.channel.send({embed: second});
	}

  // Reset embed values to default
	embed.fields[1].value = where;

  // Remove the user's invoking message
	message.delete();

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator",
  guilds: ["382696689812766720", "485523397179342848"]
};

exports.help = {
  name: "event",
  category: "Information",
  description: "Post an embed for an upcoming event.",
  usage: "event <help/type>  <time>  <date>  <host(s)>  [world]  [friends chat]  [voice channel]"
};