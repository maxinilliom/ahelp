const { inspect } = require("util");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const { data } = require("../guides/ttGuide.js");
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
	const name = "True Trimmed Info";
	const color = 10257648;
	const footer = {
      "icon_url": "https://cdn.discordapp.com/attachments/297388220231057419/400471386101121024/image.jpg",
      "text": "Achievement Help | Helping you reach your goals, whatever they may be!"
    };

	if (message.channel.id !== '407919969712603145' && level < 2) return;

	Object.getOwnPropertyNames(data).forEach(k => {
		if (k !== "help" && k !== "search") {
			keyList.push(k);
			if (!data[k].title) return;
			const [cat, sub, ach] = k.split(" - ");
			if (cat == "Dnds") cat = "D&Ds";
			if (!data[k].title.includes(`(${cat.toProperCase()}, ${sub.toProperCase()})`)) {
				data[k].title = `${data[k].title} (${cat.toProperCase()}, ${sub.toProperCase()})`;
			}
		}
	});
	if (!args[0]) return message.channel.send(`Please specify a valid guide name.`);

	if (args[0].toLowerCase() == "all" && level >= 2) {
		let i = 0, o = 0, x = keyList.length, errMsg = "";
		const category = args[1] ? args[1].toLowerCase() : undefined;
		if (["dnds", "minigames", "miscellaneous", "unlockables"].includes(category)) category = undefined;
		async function list() {
			const [cat, sub, ach] = keyList[o].split(" - ");
			if (category && cat !== category) {
				o++;
				if (o < x) list();
                if (o == x) message.reply(`**${i}**/\**${keyList.length}** responses listed.\n\n${errMsg}`);
				return;
			}
			const guide = data[keyList[o]];
			guide.color = color;
		    if (guide.author) guide.author.name = name;
      		if (guide.footer) guide.footer = footer;
		    if (guide.timestamp) guide.timestamp = new Date();
			try {
				await message.channel.send("", {embed: guide});
			} catch (err) {
				errMsg += `${o}. ${keyList[o]} failed to send with error: ${err}`;
				i--;
			}
			i++;
			o++;
			if (o < x) setTimeout(list, 2500);
			if (o == x) message.reply(`**${i}**/\**${keyList.length}** responses listed.\n\n${errMsg}`);
		}
		list();
		return message.delete();
	}

	if (args[0].toLowerCase() == "help") {
		let output = "";
		let second = "";
		let third = "";
		let fourth = "";
		const helpEmbed = data["help"];
		keyList.forEach(k => {
			if (!data[k].title) return;
			if (output.length <= 1950) {
				output += `• ${data[k].title}\n`;
			} else if (second.length <= 1950) {
				second += `• ${data[k].title}\n`;
			} else if (third.length <= 1950) {
				third += `• ${data[k].title}\n`;
			} else if (fourth.length <= 1950) {
				fourth += `• ${data[k].title}\n`;
			}
		});
		helpEmbed.title = "Comprehensive list of all valid True Trimmed guides";
		helpEmbed.author.name = name;
		helpEmbed.description = output;
		helpEmbed.color = color;
		helpEmbed.footer = footer;
		helpEmbed.timestamp = new Date();
		await message.channel.send("", {embed: helpEmbed});

		if (second.length > 0) {
			helpEmbed.description = second;
			helpEmbed.timestamp = new Date();
			await message.channel.send("", {embed: helpEmbed});
		}

		if (third.length > 0) {
			helpEmbed.description = third;
			helpEmbed.timestamp = new Date();
			await message.channel.send("", {embed: helpEmbed});
		}

		if (fourth.length > 0) {
			helpEmbed.description = fourth;
			helpEmbed.timestamp = new Date();
			await message.channel.send("", {embed: helpEmbed});
		}

		const helpMsg = message.channel.id == '382701090430386180'
			? `To search for a guide, use **.${exports.help.name}** <keyword>.`
			: `To search for a guide, use **.${exports.help.name}** <keyword> in the <#382701090430386180> channel.`
		message.channel.send(helpMsg);
		return;
	}

	keyList.forEach(k => {
		if (RegExp(achName).test(k) && !/\bpt\d/.test(k) && !rtnArr.includes(k)) rtnArr.push(k);
		if (RegExp(achName).test(k) && /\bpt\d/.test(k)) {
			const guide = data[k];
			guide.color = color;
			if (/\bpt1/.test(k)) guide.author.name = name;
			if (guide.footer) guide.footer = footer;
			if (guide.timestamp) guide.timestamp = new Date();
			message.channel.send("", {embed: guide});
			pt = "true";
		}
	});

	if (rtnArr.length == 0 && pt == "false") {
		return message.channel.send(`No results found for **${args.join(" ")}**.`);
	} else if (rtnArr.length == 1) {
		const guide = data[rtnArr[0]];
		guide.author.name = name;
		guide.color = color;
		guide.footer = footer;
		guide.timestamp = new Date();
		message.channel.send("", {embed: guide});
	} else if (rtnArr.length > 1) {
		let output = "";
		let i = 1;
		const searchEmbed = data["search"];
		rtnArr.forEach(n => {
			output += `${i}: ${data[rtnArr[i-1]].title}\n`;
			i++;
		});
		searchEmbed.title = "All True Trimmed guides matching your search";
		searchEmbed.author.name = name;
		searchEmbed.description = output;
		searchEmbed.color = color;
		searchEmbed.footer = footer;
		searchEmbed.timestamp = new Date();
		message.channel.send("", {embed: searchEmbed});
		const response = await client.awaitReply(message, "Which were you searching for? Please enter the corresponding number.");
		if (isNaN(response) || response > rtnArr.length || response < 1) return message.channel.send("Invalid number specified, search cancelled.");
		const choice = data[rtnArr[response-1]];
		choice.author.name = name;
		choice.color = color;
		choice.footer = footer;
		choice.timestamp = new Date();
		return message.channel.send("", {embed: choice});
	} else if (pt == "true") {
		return;
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
	description: "An encyclopedia of True Trimmed guides.",
	usage: "truetrim <help/guide name>"
};
