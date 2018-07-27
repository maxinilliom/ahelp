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

	if (message.channel.id !== '407919969712603145' && level < 2) return;

	Object.getOwnPropertyNames(data).forEach(k => {
		if (data[k].cmds.includes("true")) keyList.push(k);
	});
	if (!args[0]) return message.channel.send(`Please specify a valid achievement name.`);

	if (args[0].toLowerCase() == "all" && level >= 2) {
		let i = 0, o = 0, x = keyList.length;
		function list() {
			const guide = data[keyList[o]].embed;
			guide.author.name = "True Trimmed Info";
			guide.color = 10257648;
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
		let third = "";
		const helpEmbed = data["help"].embed;
		keyList.forEach(k => {
			if (output.length >= 2000) {
				output += `• ${data[k].embed.title}\n`;
			} else if (second.length <= 2000) {
				second += `• ${data[k].embed.title}\n`;
			} else {
				third += `• ${data[k].embed.title}\n`;
			}
		});
		helpEmbed.title = "Comprehensive list of all valid True Trimmed achievement guides";
		helpEmbed.author.name = "True Trimmed Info";
		helpEmbed.description = output;
		helpEmbed.color = 10257648;
		helpEmbed.timestamp = new Date();
		message.channel.send("", {embed: helpEmbed});

		if (second.length > 0) {
			helpEmbed.description = second;
			helpEmbed.timestamp = new Date();
			message.channel.send("", {embed: helpEmbed});
		}

		if (third.length > 0) {
			helpEmbed.description = third;
			helpEmbed.timestamp = new Date();
			await message.channel.send("", {embed: helpEmbed});
		}
		const helpMsg = message.channel.id == '382701090430386180'
			? `To search for an achievement, use **.${exports.help.name}** <keyword>.`
			: `To search for an achievement, use **.${exports.help.name}** <keyword> in the <#382701090430386180> channel.`		message.channel.send(helpMsg);		message.channel.send(helpMsg);
		return;
	}

	keyList.forEach(k => {
		if (RegExp(achName).test(k) && !rtnArr.includes(k)) rtnArr.push(k);
	});

	if (rtnArr.length == 0) {
		return message.channel.send(`No results found for **${args.join(" ")}**.`);
	} else if (rtnArr.length == 1) {
		const guide = data[rtnArr[0]].embed;
		guide.author.name = "True Trimmed Info";
		guide.color = 10257648;
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
		searchEmbed.title = "All True Trimmed achievement guides matching your search";
		searchEmbed.author.name = "True Trimmed Info";
		searchEmbed.description = output;
		searchEmbed.color = 10257648;
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
	aliases: ["tt"],
	permLevel: "User",
	guilds: []
};

exports.help = {
	name: "truetrim",
	category: "Guides",
	description: "Encyclopedia of True Trimmed guides written by Frosty and assembled by Son.",
	usage: "truetrim <help/achievement name>"
};
