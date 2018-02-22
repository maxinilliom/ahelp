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
	Object.getOwnPropertyNames(data).forEach(k => {
		if (data[k].cmds.includes("comp")) keyList.push(k);
	});
	if (!args[0]) return message.channel.send(`Please specify an achievement name.`);

	if (args[0].toLowerCase() == "help") {
		let output = "";
		const helpEmbed = data["help"].content;
		keyList.forEach(k => {
			if (k !== "help" && k !== "search") output += `${k.toProperCase()}\n`;
		});
		helpEmbed.title = "Comprehensive list of all valid Completionist guide commands";
		helpEmbed.author.name = "Comp Cape Info";
		helpEmbed.description = output;
		return message.channel.send("", {embed: helpEmbed});
	}
	if (keyList.includes(achName)) return message.channel.send("", {embed: data[achName.content]});
	args.forEach(a => {
		keyList.forEach(k => {
			if (k.includes(a)) rtnArr.push(k);
		});
	});

	if (rtnArr.length == 0) {
		return message.channel.send(`No results found for ${args.join(" ")}.`);
	} else if (rtnArr.length == 1) {
		const guide = data[rtnArr[0]].content;
		message.channel.send("", {embed: guide});
	} else if (rtnArr.length > 1) {
		let output = "";
		let i = 1;
		const searchEmbed = data["search"].content;
		rtnArr.forEach(n => {
			output += `${i}: ${rtnArr[i-1].toProperCase()}\n`;
			i++;
		});
		searchEmbed.title = "All Completionist Cape guide commands matching your search";
		searchEmbed.author.name = "Comp Cape Info";
		searchEmbed.description = output;
		return message.channel.send("", {embed: searchEmbed});
	} else {
	message.channel.send("If you see this, contact @97928972305707008");
	}
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: "Administrator",
	guilds: []
};

exports.help = {
	name: "comp",
	category: "Guides",
	description: "Encyclopedia of Completionist Cape guides written by The Five-O and assembled by Son.",
	usage: "comp <help/achievement name>"
};
