const { inspect } = require("util");

	/* const { something } = require("something");
		// is same as
		const something = require("something").something;

		// Arrays
		const arr = ["hi", "bye"];

		const [hi, bye] = arr;
		console.log(hi); // "hi"
		console.log(bye); // "bye" */

exports.run = async (client, message, [action, key, ...value], level) => { // eslint-disable-line no-unused-vars
	
	const settings = client.settings.get(message.guild.id);
	const logChannel = client.channels.find("id", settings.logChannel);
	const isDef = "328838896274112513";

	if (action === "add") {
		if (!key) return message.channel.send("Please specify a key to add.");
		if (settings[key]) return message.channel.send("This key already exists.");
		if (value.length < 1) return message.channel.send("Please specify a value.");
		if (typeof(value.join(" ")) !== 'string') return message.channel.send("Invalid value specified.");

		settings[key] = value.join(" ");
		client.settings.set(message.guild.id, settings);
		message.channel.send(`${key} successfully added with the value of ${value.join(" ")}`);
		if (message.guild.id == isDef) {
			logChannel.send(`${message.author.tag} added ${key} with the value of ${value.join(" ")}`);
		} else {
			logChannel.send(`${message.author.tag} added ${key} with the value of ${value.join(" ")} in ${message.guild.name}`);
		}
		
	} else 

	if (action === "edit") {
		if (!key) return message.channel.send("Please specify a key to add.");
		if (!settings[key]) return message.channel.send("This key does not exist.");
		if (value.length < 1) return message.channel.send("Please specify a new value.");
		if (typeof(value.join(" ")) !== 'string') return message.channel.send("Invalid value specified.");
		if (key == "enabledCommands") return message.channel.send("Please use `command` to edit this setting.");
		if (key == "muteList") return message.channel.send("This array can only be read/written to using `mute` and `unmute`");
		if (key == "logChannel" && !Number(value.join(" "))) return message.channel.send("Please specify a valid channel ID.");

		const prev = settings[key];
		settings[key] = value.join(" ");
		client.settings.set(message.guild.id, settings);
		message.channel.send(`${key} successfully changed from ${prev} to ${value.join(" ")}`);
		if (message.guild.id == isDef) {
			logChannel.send(`${message.author.tag} changed ${key} from ${prev} to ${value.join(" ")}`);
		} else {
			logChannel.send(`${message.author.tag} changed ${key} from ${prev} to ${value.join(" ")} in ${message.guild.name}`);
		}
		
	} else

	if (action === "del") {
		if (!key) return message.channel.send("Please specify a key to delete.");
		if (!settings[key]) return message.channel.send("This key does not exist.");
		
		const prev = `${key}: ${settings[key]}`;
		delete settings[key];
		client.settings.set(message.guild.id, settings);
		message.channel.send(`${key} was deleted.`);
		if (message.guild.id == isDef) {
			logChannel.send(`${prev} was deleted from the server settings by ${message.author.tag}`);
		} else {
			logChannel.send(`${prev} was deleted from the server settings by ${message.author.tag} in ${message.guild.name}`);
		}
		
	} else

	if (action === "get") {
		if (!key) return message.channel.send("Please specify a key to delete.");
		if (!settings[key]) return message.channel.send("This key does not exist.");
		message.channel.send(`The value of ${key} is currently ${settings[key]}`);
	} else 

	if (action === "reset") {
		const response = await client.awaitReply(message, "Are you sure that you want to reset your servers settings to default? This is irreversible.")
		if (["y","yes"].includes(response)) {
			const set = client.config.defaultSettings;
			client.settings.set(message.guild.id, set);
			message.channel.send(`Settings reset to default.`);
			if (message.guild.id == isDef) {
			logChannel.send(`Server settings reset to default by ${message.author.tag}`);
			} else {
			logChannel.send(`Server settings reset to default by ${message.author.tag} in ${message.guild.name}`);
			}
		} else
		if (["n","no","cancel"].includes(response)) {
			message.channel.send("Action cancelled.");
		}


	} else {
		message.channel.send(inspect(settings), {code: "json"});
	}
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ["setting", "settings", "conf"],
	permLevel: "Administrator",
	guilds: []
};

exports.help = {
	name: "set",
	category: "System",
	description: "View or modify server settings.",
	usage: "set <get/add/edit/del> <key> <value>"
};