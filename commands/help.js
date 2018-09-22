exports.run = (client, message, args, level) => {
	if (!args[0]) {
		const settings = message.guild
			? client.settings.get(message.guild.id)
			: client.config.defaultSettings;
		const myCommands = message.guild
			? client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level /*&& cmd.conf.guilds.includes(message.guild.id)*/ && settings.enabledCommands.includes(cmd.help.name) && cmd.conf.enabled// && cmd.help.category !== "Guides")
			: client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level && !cmd.conf.guildOnly && cmd.conf.enabled// && cmd.help.category !== "Guides");
		const posCommands = message.guild
			? client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level /*&& cmd.conf.guilds.includes(message.guild.id)*/ && !settings.enabledCommands.includes(cmd.help.name) && cmd.conf.enabled// && cmd.help.category !== "Guides")
			: client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level && !cmd.conf.guildOnly && cmd.conf.enabled// && cmd.help.category !== "Guides");
		const commandNames = myCommands.keyArray();
		const posNames = posCommands.keyArray();
		const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

		let currentCategory = "";
		let output = `== Command List ==\n\n[Use ${settings.prefix}help <command> for further details.]\n`;
		const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 : p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
		sorted.forEach(c => {
			const cat = c.help.category.toProperCase();
			if (currentCategory !== cat) {
				output += `\u200b\n== ${cat} ==\n`;
				currentCategory = cat;
			}
			output += `${settings.prefix}${c.help.name}${" ".repeat(longest - c.help.name.length)} : ${c.help.description}\n`;
		});
		if (message.guild && posNames.length > 0) output += `\n\n== Disabled Commands ==\n${posNames.join(", ")}`;
		message.channel.send(output, {code: "asciidoc", split: {char: "\u200b"}});
	} else {
		let command = args[0];
		if (client.commands.has(command) || client.aliases.has(command)) {
			command = client.commands.get(command) || client.commands.get(client.aliases.get(command));
			if (level < client.levelCache[command.conf.permLevel]) return;
			command.conf.aliases.length > 0
			? message.channel.send(`= ${command.help.name} = \n${command.help.description}\nusage: ${command.help.usage}\naliases: ${command.conf.aliases.join(", ")}\n= ${command.help.name} =`, {code:"asciidoc"})
			: message.channel.send(`= ${command.help.name} = \n${command.help.description}\nusage: ${command.help.usage}\n= ${command.help.name} =`, {code:"asciidoc"});

		}
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ["h"],
	permLevel: "User",
	guilds: [],
	cooldown: 1500
};

exports.help = {
	name: "help",
	category: "System",
	description: "Displays all commands you have permission to use.",
	usage: "help [command]"
};
