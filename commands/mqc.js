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

	if (message.channel !== '382701090430386180' && message.author.permLevel < 1) return;

	Object.getOwnPropertyNames(data).forEach(k => {
		if (data[k].cmds.includes("mqc")) keyList.push(k);
	});
	if (!args[0]) return message.channel.send(`Please specify an achievement name.`);

	if (args[0].toLowerCase() == "all" && message.author.permLevel >= 4) {
		let i = 0;
		keyList.forEach(k => {
			const guide = data[k].embed;
			guide.author.name = "Master Quest Cape Info";
			guide.color = 8113151;
			guide.timestamp = new Date();
			message.channel.send("", {embed: guide});
			i++;
		});
	return message.channel.send(`**${i}**/\**${keyList.length}** responses listed.`);
	}

	if (args[0].toLowerCase() == "help") {
		let output = "";
		const helpEmbed = data["help"].embed;
		keyList.forEach(k => {
			output += `${data[k].embed.title}\n`;
		});
		helpEmbed.title = "Comprehensive list of all valid Master Quest Cape guide commands";
		helpEmbed.author.name = "Master Quest Cape Info";
		helpEmbed.description = output;
		helpEmbed.color = 8113151;
		helpEmbed.timestamp = new Date();
		return message.channel.send("", {embed: helpEmbed});
	}
/*	args.forEach(a => {
		keyList.forEach(k => {
			if (k.includes(a.toLowerCase()) && !rtnArr.includes(k)) rtnArr.push(k);
		});
	});*/

	keyList.forEach(k => {
		if (RegExp(achName).test(k) && !rtnArr.includes(k)) rtnArr.push(k);
	});

	if (rtnArr.length == 0) {
		return message.channel.send(`No results found for **${args.join(" ")}**.`);
	} else if (rtnArr.length == 1) {
		const guide = data[rtnArr[0]].embed;
		guide.author.name = "Master Quest Cape Info";
		guide.color = 8113151;
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
		searchEmbed.title = "All Master Quest Cape guide commands matching your search";
		searchEmbed.author.name = "Master Quest Cape Info";
		searchEmbed.description = output;
		searchEmbed.color = 8113151;
		searchEmbed.timestamp = new Date();
		message.channel.send("", {embed: searchEmbed});
		const response = await client.awaitReply(message, "Which achievement were you searching for? Please enter the corresponding number.");
		if (isNaN(response) || response > rtnArr.length || response < 1) return message.channel.send("Invalid number specified, search cancelled.");
		const choice = data[rtnArr[response-1]].embed;
		return message.channel.send("", {embed: choice});
	} else {
	message.channel.send("If you see this, contact @<97928972305707008>");
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
	name: "mqc",
	category: "Guides",
	description: "Encyclopedia of Master Quest Cape guides written by The Five-O and assembled by Son.",
	usage: "mqc <help/achievement name>"
};
