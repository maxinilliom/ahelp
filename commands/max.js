const { inspect } = require("util");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);

	/* const { something } = require("something");
		// is same as
		const something = require("something").something;

		// Arrays
		const arr = ["hi", "bye"];

		const [hi, bye] = arr;
		console.log(hi); // "hi"
		console.log(bye); // "bye" */

exports.run = async (client, message, [skill, ...args], level) => { // eslint-disable-line no-unused-vars
	if (!skill) return message.channel.send(`Please specify a skill name.`);
	if (skill && !client.maxGuides.includes(skill.toLowerCase())) return message.channel.send(`**${skill.toProperCase()}** is not a valid skill name.`);
	if (!args[0]) return message.channel.send(`Please specify options to search the **${skill.toProperCase()}** guides with.`);
	if (message.channel !== '382701090430386180' && message.author.permLevel < 1) return;
	const { data } = require(`../guides/maxGuides/${skill}.js`);
	const keyList = [];
	const numKeyList = [];
	const strKeyList = [];
	const rtnArr = [];

	Object.getOwnPropertyNames(data).forEach(k => {
		if (k !== "help" && k !== "search") keyList.push(k);
	});

	if (args[0].toLowerCase() == "help") {
                let output = "";
                const helpEmbed = data["help"];
                keyList.forEach(k => {
                        output += `${data[k].title}\n`;
                });
                helpEmbed.title = `Comprehensive list of all valid ${skill.toProperCase()} guide commands`;
                helpEmbed.description = output;
                helpEmbed.color = 12269891;
                return message.channel.send("", {embed: helpEmbed});
        }

	if (Number(args[0])) {
		//number search
		keyList.forEach(k => {
			const first = Number(k.split(" ")[0]);
			const last = Number(k.split(" ")[2]);
			if (args[0] >= first && args[0] < last) rtnArr.push(k);
		});
	} else if (!Number(args[0])) {
		//string search
		keyList.forEach(k => {
			if (RegExp(args[0]).test(k) && !rtnArr.includes(k)) rtnArr.push(k);
		});
	}

	//dumped below - double check all code. add help above and check for help/search embeds
	//finalise help/search embeds in melee with formatting from max commands and copy to agility
        if (rtnArr.length == 0) {
                return message.channel.send(`No results found for **${args.join(" ")}**.`);
        } else if (rtnArr.length == 1) {
                const guide = data[rtnArr[0]];
                message.channel.send("", {embed: guide});
        } else if (rtnArr.length > 1) {
                let output = "";
                let i = 1;
                const searchEmbed = data["search"];
                rtnArr.forEach(n => {
                        output += `${i}: ${data[rtnArr[i-1]].title}\n`;
                        i++;
                });
                searchEmbed.title = `All ${skill.toProperCase()} guide commands matching your search`;
                searchEmbed.description = output;
                message.channel.send("", {embed: searchEmbed});
                const response = await client.awaitReply(message, "Which guide were you searching for? Please enter the corresponding number.");
                if (isNaN(response) || response > rtnArr.length || response < 1) return message.channel.send("Invalid number specified, search cancelled.");
                const choice = data[rtnArr[response-1]];
                return message.channel.send("", {embed: choice});
        } else {
        message.channel.send("If you see this, contact @<97928972305707008>");
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
	name: "max",
	category: "Guides",
	description: "Encyclopedia of Max Cape guides written by The Five-O and assembled by Son.",
	usage: "max <help/skill> <level/name/help>"
};
