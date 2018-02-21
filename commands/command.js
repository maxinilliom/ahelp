const { inspect } = require("util");

	/* const { something } = require("something");
		// is same as
		const something = require("something").something;

		// Arrays
		const arr = ["hi", "bye"];

		const [hi, bye] = arr;
		console.log(hi); // "hi"
		console.log(bye); // "bye" */

exports.run = async (client, message, [action, key, spec, ...value], level) => { // eslint-disable-line no-unused-vars

	const settings = client.settings.get(message.guild.id);
	const logChannel = client.channels.find("id", settings.logChannel);
	let cmds = settings.enabledCommands;
	let cmd = client.commands.get(key) || client.commands.get(client.aliases.get(key));
	const cmdName = cmd.help.name;
	const isDef = "328838896274112513";
	switch (action) {
		case "e":
		case "enable":
			if (!cmd && !key) return message.channel.send("Please specify a command to enable.");
			if (!cmd && key) return message.channel.send(`Invalid command: \`${key}\``);
			if (cmds.includes(cmdName)) return message.channel.send(`\`${cmdName}\` is already enabled on this server.`);
			if (!cmds.includes(cmdName)) {
				cmds.push(cmdName);
				settings.enabledCommands = cmds;
				client.settings.set(message.guild.id, settings);
				return message.channel.send(`\`${cmdName}\` successfully enabled for ${message.guild.name}`);
			}
		break;
		case "d":
		case "disable":
			if (!cmd && !key) return message.channel.send("Please specify a command to disable.");
			if (!cmd && key) return message.channel.send(`Invalid command: \`${key}\``);
			if (!cmds.includes(cmdName)) return message.channel.send(`\`${cmdName}\` is not enabled on this server.`);
			if (cmds.includes(cmdName)) {
				cmds = cmds.filter(c => c !== cmdName);
				settings.enabledCommands = cmds;
				client.settings.set(message.guild.id, settings);
				return message.channel.send(`\`${cmdName}\` successfully disabled for ${message.guild.name}.`);
			}
		break;
		case "r":
		case "reload":
			if (!cmd && !key) return message.channel.send("Please specify a command to reload.");
			if (!cmd && key) return message.channel.send(`Invalid command: \`${key}\``);
			let response = await client.unloadCommand(cmd.help.name);
			if (response) return message.channel.send(`Error unloading: ${response}`);
			response = client.loadCommand(cmd.help.name);
			if (response) return message.channel.send(`Error loading: ${response}`);
			return message.channel.send(`\`${cmd.help.name}\` reloaded.`);
		break;
		case "g":
		case "guilds":
			let guild = client.guilds.get(value[0]) || "";
			if (!cmd && !key) return message.channel.send("Please specify a command to edit the guild availability for.");
			if (!cmd && key) return message.channel.send(`Invalid command: \`${key}\``);
			if (!spec) return message.channel.send(`Please use \`<add/del>\` to modify this setting.`);
			if (spec !== "get" && !Number(value[0]) || spec !== "get" && !Number(value.join(" ")))
				return message.channel.send("Please specify a valid guild ID.");
			//command guilds [command] [add/del] [guild]
			//message action    key    spec      value[0]
			if (spec == "add") {
				if (cmd.conf.guilds.includes(value[0]))
					return message.channel.send(`\`${guild}\` already exists in the available guilds for \`${key}\`.`);
				const guilds = cmd.conf.guilds;
				guilds.push(value[0]);
				cmd.conf.guilds = guilds;
				client.commands.set(key, cmd);
				return message.channel.send(`${guild} \`${value[0]}\` added to available guilds for \`${cmd.help.name}\`.`);
			}
			if (spec == "del") {
				let guilds = cmd.conf.guilds;
				guilds = guilds.filter(e => e !== value[0]);
				cmd.conf.guilds = guilds;
				client.commands.set(key, cmd);
				return message.channel.send(`${guild} \`${value[0]}\` removed from enabled guilds for \`${cmd.help.name}\`.`);
			}
			if (spec == "get") {
				if (message.author.id !== client.config.ownerID && !client.config.admins.includes(message.author.id)) return;
				const guilds = cmd.conf.guilds;
				if (guilds > 0)
					message.channel.send(`Currently available guilds for \`${cmd.help.name}\`:\n\`${guilds.join("\n")}\``);
				else
					message.channel.send(`\`${cmd.help.name}\` is currently available to all guilds.`);
			}
			else {
				return message.channel.send(`Invalid usage. Please use \`.command guilds <command> <add/del> <serverID>\`.`);
			}
		break;
		default:
			return message.channel.send("Incorrect usage. Use `.help <command>` for more information.");
	}

};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ["c","cmd"],
	permLevel: "Administrator",
	guilds: [],
	cooldown: 500
};

exports.help = {
	name: "command",
	category: "System",
	description: "Enable/disable/reload commands. Configure per-guild commands.",
	usage: "command <enable/disable/reload/guilds> <cmd> [add/del]"
};
