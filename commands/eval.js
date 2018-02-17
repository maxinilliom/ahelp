exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

	const code = args.join(" ");
	try {
		const evaled = eval(code);
		const clean = await client.clean(client, evaled);
		message.channel.send(`\`\`\`js\n${clean}\n\`\`\``);
	} catch (err) {
		message.channel.send(`\`ERROR\``);
		message.channel.send(`\`\`\`${await client.clean(client, err)}\`\`\``);
	}

};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ["e","ev"],
	permLevel: "Bot Owner",
	guilds: []
};

exports.help = {
	name: "eval",
	category: "System",
	description: "Evaluates arbitrary Javascript.",
	usage: "eval [...code]"
};