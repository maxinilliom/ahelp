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
	if (message.channel.id !== '429108140924076032' && level < "2") return;
	if (!skill) return message.channel.send(`Please specify a skill name.`);
	if (skill && !client.maxGuides.includes(skill.toLowerCase())) return message.channel.send(`**${skill.toProperCase()}** is not a valid skill name.`);
	if (!args[0] && skill !== "help" && skill !== "all" && skill !== "universal") return message.channel.send(`Please specify options to search the **${skill.toProperCase()}** guides with.`);
	const { data } = require(`../guides/maxGuides/${skill.toLowerCase()}.js`);
	const keyList = [];
	const numKeyList = [];
	const strKeyList = [];
	const rtnArr = [];

	if (skill.toLowerCase() == "universal") {
		message.channel.send("", {embed: data[0]});
		message.channel.send("", {embed: data[1]});
		return;
	}

	Object.getOwnPropertyNames(data).forEach(k => {
		if (k !== "help" && k !== "search") keyList.push(k);
	});

	if (skill.toLowerCase() == "help") {
		let output = "";
		const helpEmbed = data["help"];
		client.maxGuides.forEach(g => {
			if (g !== "help" && g !== "universal") output += `• ${g.toProperCase()}\n`;
		});
		helpEmbed.title = `Comprehensive list of all valid skills`;
		helpEmbed.description = output;
		helpEmbed.color = 12269891;
		return message.channel.send("", {embed: helpEmbed});
	}

	if (args[0].toLowerCase() == "help") {
                let output = "";
                const helpEmbed = data["help"];
                keyList.forEach(k => {
                        output += `• ${data[k].title}\n`;
                });
                helpEmbed.title = `Comprehensive list of all valid ${skill.toProperCase()} guide commands`;
                helpEmbed.description = output;
		helpEmbed.color = 12269891;
		return message.channel.send("", {embed: helpEmbed});
        }

	if (args[0].toLowerCase() == "all" && level >=2) {
                let i = 0, o = 0, x = keyList.length;
                function list() {
                        const guide = data[keyList[o]];
                        guide.author.name = "Max Cape Info";
                        guide.color = 12269891;
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

	if (Number(args[0])) {
		//number search
		keyList.forEach(k => {
			const first = Number(k.split(" ")[0]);
			let last = Number(k.split(" ")[2]);
			if (last == "99") last += 1;
			if (args[0] >= first && args[0] < last) rtnArr.push(k);
		});
	} else if (!Number(args[0])) {
		//string search
		keyList.forEach(k => {
			if (RegExp(args[0].toLowerCase()).test(k) && !rtnArr.includes(k)) rtnArr.push(k);
		});
	}

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
	permLevel: "User",
	guilds: []
};

exports.help = {
	name: "max",
	category: "Guides",
	description: "Encyclopedia of Max Cape guides written by The Five-O and assembled by Son.",
	usage: "max <help/skill> <level/name/help>"
};
