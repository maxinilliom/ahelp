const { inspect } = require("util");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const { data } = require("../guides/rsGuide.js");
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
	const split = args[0] ? args.join(" ").toLowerCase().split(" - ") : undefined;
	let cat = split && split[0] ? split[0].trim() : undefined
	let sub = split && split[1] ? split[1].trim() : undefined
	let ach = split && split[2] ? split[2].trim() : undefined
	const catLast = cat && cat.split(" ").pop() == "help" ? cat.split(" ").pop() : undefined;
	const subLast = sub && sub.split(" ").pop() == "help" ? sub.split(" ").pop() : undefined;
	cat = catLast == "all" || catLast == "help" ? cat.substring(0, cat.lastIndexOf(" ")) : cat;
	sub = subLast == "all" || subLast == "help" ? sub.substring(0, sub.lastIndexOf(" ")) : sub;
	const keyList = [];
	const catList = [];
	const subList = [];
	const rtnArr = [];
	const name = "RuneScore Info";
	const color = 2011148;

	if (!args[0]) return message.channel.send(`Please specify a valid category to search within.`);

	if (message.channel.id !== '407919969712603145' && level < 2) return;

	Object.getOwnPropertyNames(data).forEach(k => {
		const guideSplit = k.split("-");
		const guideCat = guideSplit[0].trim();
//		const guideSub = guideSplit[1].trim();
		if (k !== "help" && k !== "search") keyList.push(k);
		if (k !== "help" && k !== "search" && !catList.includes(guideCat)) catList.push(guideCat);
//		if (!subList.includes(guideSub)) subList.push(guideSub);
	});


	if (cat == "all" && level >= 2) {
		let i = 0, o = 0, x = keyList.length;
		function list() {
			const guide = data[keyList[o]].embed;
			guide.author.name = name;
			guide.color = color;
			guide.timestamp = new Date();
			message.channel.send("", {embed: guide});
			i++;
			o++;
			if (o < x) {
				setTimeout(list, 2500);
			}
//			if (o == x) message.reply(`**${i}**/\**${keyList.length}** responses listed.`);
		}
		list();
		return message.delete();
	}

	if (cat == "help") {
		let output = "";
		const helpEmbed = data["help"].embed;
		keyList.forEach(k => {
			const guideSplit = k.split("-");
			const guideCat = guideSplit[0].trim();
			if (output.includes(`• ${guideCat}\n`)) return;
			if (output.join("").length <= 2000) {
				output.push(`• ${guideCat}\n`);
			}
		});
		helpEmbed.title = "Comprehensive list of all valid RuneScore achievement categories";
		helpEmbed.author.name = name;
		helpEmbed.description = output.join("");
		helpEmbed.color = color;
		helpEmbed.timestamp = new Date();
		message.channel.send("", {embed: helpEmbed});
		const helpMsg = message.channel.id == '382701090430386180'
			? `To search for an achievement, use **.${exports.help.name}** <category> <sub-category> <keyword>.`
			: `To search for an achievement, use **.${exports.help.name}** <category> <sub-category> <keyword> in the <#382701090430386180> channel.`
		message.channel.send(helpMsg);
		return;
	}

	if (!catList.includes(cat)) return message.channel.send(`Please specify a valid category to search within.`);

	if (catLast == "all" && level >= 2) {
		let i = 0, o = 0, x = keyList.length;
		function list() {
			const guideSplit = keyList[o].split("-");
			const guideCat = guideSplit[0].trim();
			if (!catList.includes(guideCat)) return;
			const guide = data[keyList[o]].embed;
			guide.author.name = name;
			guide.color = color;
			guide.timestamp = new Date();
			message.channel.send("", {embed: guide});
			i++;
			o++;
			if (o < x) {
				setTimeout(list, 2500);
			}
//			if (o == x) message.reply(`**${i}**/\**${keyList.length}** responses listed.`);
		}
		list();
		return message.delete();
	}

	if (catLast == "help") {
		let output = "";
		const helpEmbed = data["help"].embed;
		keyList.forEach(k => {
			const guideSplit = k.split("-");
			const guideCat = guideSplit[0].trim();
			const guideSub = guideSplit[1].trim();
			if (output.includes(`• ${guideSub}\n`)) return;
			if (output.join("").length <= 2000) {
				output.push(`• ${guideSub}\n`);
			}
		});
		helpEmbed.title = `Comprehensive list of all valid RuneScore achievement sub-categories within ${cat}`;
		helpEmbed.author.name = name;
		helpEmbed.description = output.join("");
		helpEmbed.color = color;
		helpEmbed.timestamp = new Date();
		message.channel.send("", {embed: helpEmbed});

		const helpMsg = message.channel.id == '382701090430386180'
			? `To search for an achievement, use **.${exports.help.name}** <category> <sub-category> <keyword>.`
			: `To search for an achievement, use **.${exports.help.name}** <category> <sub-category> <keyword> in the <#382701090430386180> channel.`
		message.channel.send(helpMsg);
		return;
	}

	if (!subList.includes(sub)) return message.channel.send(`Please specify a valid sub-category to search within.`);

	keyList.forEach(k => {
//		if (RegExp(achName).test(k) && !rtnArr.includes(k)) rtnArr.push(k);

	});

	if (rtnArr.length == 0) {
		return message.channel.send(`No results found for **${args.join(" ")}**.`);
	} else if (rtnArr.length == 1) {
		const guide = data[rtnArr[0]].embed;
		guide.author.name = name;
		guide.color = color;
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
		searchEmbed.title = "All RuneScore achievement guides matching your search";
		searchEmbed.author.name = name;
		searchEmbed.description = output;
		searchEmbed.color = color;
		searchEmbed.timestamp = new Date();
		message.channel.send("", {embed: searchEmbed});
		const response = await client.awaitReply(message, "Which achievement were you searching for? Please enter the corresponding number.");
		if (isNaN(response) || response > rtnArr.length || response < 1) return message.channel.send("Invalid number specified, search cancelled.");
		const choice = data[rtnArr[response-1]].embed;
		choice.author.name = name;
		choice.color = color;
		choice.timestamp = new Date();
		return message.channel.send("", {embed: choice});
	} else {
	message.channel.send("If you see this, contact <@97928972305707008>");
	}
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ["rs"],
	permLevel: "User",
	guilds: []
};

exports.help = {
	name: "runescore",
	category: "Guides",
	description: "An encyclopedia of RuneScore guides.",
	usage: "runescore <help/achievement name>"
};
