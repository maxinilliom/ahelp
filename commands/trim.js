const { inspect } = require("util");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const { data } = require("../guides/compGuide.js");
//const data = "";

	/* const { something } = require("something");
		// is same as
		const something = require("something").something;

		// Arrays
		const arr = ["hi", "bye"];

		const [hi, bye] = arr;
		console.log(hi); // "hi"
		console.log(bye); // "bye" */

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	const achName = args.join(" ").toLowerCase();
	const keyList = [];
	const rtnArr = [];

	if (message.channel.id !== '412093678283128863' && level < 2) return;

	Object.getOwnPropertyNames(data).forEach(k => {
		if (data[k].cmds.includes("trim")) keyList.push(k);
	});
	if (!args[0]) return message.channel.send(`Please specify a valid achievement name.`);

	if (args[0].toLowerCase() == "all" && level >= 2) {
		let i = 0, o = 0, x = keyList.length;
		function list() {
			const guide = data[keyList[o]].embed;
			guide.author.name = "Trimmed Completionist Cape Info";
			guide.color = 16430082;
			guide.timestamp = new Date();
			message.channel.send("", {embed: guide});
			i++;
			o++;
			if (o < x) {
				setTimeout(list, 2500);
			}
			if (o == x) message.reply(`**${i}**/\**${keyList.length}** responses listed.`);
		}
		list();
		return message.delete();
	}

	if (args[0].toLowerCase() == "help") {
		let output = "";
		let second = "";
		const helpEmbed = data["help"].embed;
		keyList.forEach(k => {
			if (output.length <= 2000) {
				output += `• ${data[k].embed.title}\n`;
			} else {
				second += `• ${data[k].embed.title}\n`;
			}
		});

		helpEmbed.title = "Comprehensive list of all valid Trimmed Completionist Cape guide commands";
		helpEmbed.author.name = "Trimmed Completionist Cape Info";
		helpEmbed.description = output;
		helpEmbed.color = 16430082;
		helpEmbed.timestamp = new Date();
		message.channel.send("", {embed: helpEmbed});

		if (second.length > 0) {
			helpEmbed.description = second;
			helpEmbed.timestamp = new Date();
			message.channel.send("", {embed: helpEmbed});
		}
		return;
	}

	keyList.forEach(k => {
		if (RegExp(achName).test(k) && !rtnArr.includes(k)) rtnArr.push(k);
	});

	if (rtnArr.length == 0) {
		return message.channel.send(`No results found for **${args.join(" ")}**.`);
	} else if (rtnArr.length == 1) {
		const guide = data[rtnArr[0]].embed;
		guide.author.name = "Trimmed Completionist Cape Info";
		guide.color = 16430082;
		guide.timestamp = new Date();
		message.channel.send("", {embed: guide});
	} else if (rtnArr.length > 1) {
		let output = "";
		let i = 1;
		const searchEmbed = data["search"].embed;
		rtnArr.forEach(n => {
			output += `${i}: ${data[rtnArr[i-1]].embed.title}\n`;
			i++;
		});
		searchEmbed.title = "All Trimmed Completionist Cape guide commands matching your search";
		searchEmbed.author.name = "Trimmed Completionist Cape Info";
		searchEmbed.description = output;
		searchEmbed.color = 16430082;
		searchEmbed.timestamp = new Date();
		message.channel.send("", {embed: searchEmbed});
		const response = await client.awaitReply(message, "Which achievement were you searching for? Please enter the corresponding number.");
		if (isNaN(response) || response > rtnArr.length || response < 1) return message.channel.send("Invalid number specified, search cancelled.");
		const choice = data[rtnArr[response-1]].embed;
		return message.channel.send("", {embed: choice});
	} else {
	message.channel.send("If you see this, contact <@97928972305707008>");
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
	name: "trim",
	category: "Guides",
	description: "Encyclopedia of Trimmed Completionist Cape guides written by The Five-O and assembled by Son.",
	usage: "trim <help/achievement name>"
};
