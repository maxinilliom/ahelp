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
	if (args[0] == "-" || args[0] == "+") return;
	if (!skill) return message.channel.send(`Please specify a skill name.`);

	const aliases = {
		"agi": "agility",
		"agil": "agility",
		"atk": "attack",
		"att": "attack",
		"hp": "constitution",
		"con": "construction",
		"cons": "construction",
		"cook": "cooking",
		"craft": "crafting",
		"div": "divination",
		"divi": "divination",
		"def": "defence",
		"defense": "defence",
		"dg": "dungeoneering",
		"dung": "dungeoneering",
		"farm": "farming",
		"fm": "firemaking",
		"fish": "fishing",
		"fletch": "fletching",
		"herb": "herblore",
		"herby": "herblore",
		"hunt": "hunter",
		"inv": "invention",
		"invent": "invention",
		"mage": "magic",
		"mine": "mining",
		"pray": "prayer",
		"range": "ranged",
		"rc": "runecrafting",
		"slay": "slayer",
		"smith": "smithing",
		"str": "strength",
		"sum": "summoning",
		"summ": "summoning",
		"summon": "summoning",
		"thief": "thieving",
		"thiev": "thievingi",
		"thieve": "thieving",
		"wc": "woodcutting",
		"woodcut": "woodcutting"
	}

	if (Object.getOwnPropertyNames(aliases).includes(skill.toLowerCase())) skill = aliases[skill.toLowerCase()];

	if (skill && !client.maxGuides.includes(skill.toLowerCase())) return message.channel.send(`**${skill.toProperCase()}** is not a valid skill name.`);
	if (!args[0] && skill !== "help" && skill !== "all" && skill !== "universal") return message.channel.send(`Please specify options to search the **${skill.toProperCase()}** guides with.`);
	const { data } = require(`../guides/maxGuides/${skill.toLowerCase()}.js`);
	const keyList = [];
	const rtnArr = [];
	let pt = "false";
	const name = "Max Cape Info";
	const color = 12269891;
	const footer = {
    "text": "Let's unfurl those banners!"
  };

  switch (skill.toProperCase()) {
  	case 'Agility': footer["icon_url"] = "https://i.imgur.com/srP1pM6.png";
			break;
		case 'Attack': footer["icon_url"] = "https://i.imgur.com/gwpYsWu.png";
			break;
		case 'Constitution': footer["icon_url"] = "https://i.imgur.com/1mEzhB1.png";
			break;
		case 'Construction': footer["icon_url"] = "https://i.imgur.com/yh5fD3j.png";
			break;
		case 'Cooking': footer["icon_url"] = "https://i.imgur.com/KHb9eOf.png";
			break;
		case 'Crafting': footer["icon_url"] = "https://i.imgur.com/HwJUxAa.png";
			break;
		case 'Defence': footer["icon_url"] = "https://i.imgur.com/zYxUeSD.png";
			break;
		case 'Divination': footer["icon_url"] = "https://i.imgur.com/ElfPGQC.png";
			break;
		case 'Dungeoneering': footer["icon_url"] = "https://i.imgur.com/BNANPYA.png";
			break;
		case 'Farming': footer["icon_url"] = "https://i.imgur.com/0rtK7uL.png";
			break;
		case 'Firemaking': footer["icon_url"] = "https://i.imgur.com/HhLQMc0.png";
			break;
		case 'Fishing': footer["icon_url"] = "https://i.imgur.com/H9dO8mR.png";
			break;
		case 'Fletching': footer["icon_url"] = "https://i.imgur.com/6TXnmAF.png";
			break;
		case 'Herblore': footer["icon_url"] = "https://i.imgur.com/RGJHDBT.png";
			break;
		case 'Hunter': footer["icon_url"] = "https://i.imgur.com/rbucU6y.png";
			break;
		case 'Invention': footer["icon_url"] = "https://i.imgur.com/Wq4Y0T4.png";
			break;
		case 'Magic': footer["icon_url"] = "https://i.imgur.com/iOUr5uV.png";
			break;
		case 'Mining': footer["icon_url"] = "https://i.imgur.com/6VXKcwk.png";
			break;
		case 'Prayer': footer["icon_url"] = "https://i.imgur.com/HBi7Czz.png";
			break;
		case 'Ranged': footer["icon_url"] = "https://i.imgur.com/3eIUB5K.png";
			break;
		case 'Runecrafting': footer["icon_url"] = "https://i.imgur.com/kaiaImZ.png";
			break;
		case 'Slayer': footer["icon_url"] = "https://i.imgur.com/TCeBHKL.png";
			break;
		case 'Smithing': footer["icon_url"] = "https://i.imgur.com/mUJOyXX.png";
			break;
		case 'Strength': footer["icon_url"] = "https://i.imgur.com/6R7nOpZ.png";
			break;
		case 'Summoning': footer["icon_url"] = "https://i.imgur.com/my5cDbl.png";
			break;
		case 'Thieving': footer["icon_url"] = "https://i.imgur.com/my5cDbl.png";
			break;
		case 'Woodcutting': footer["icon_url"] = "https://i.imgur.com/FrBPOyS.png";
			break;
		default: footer["icon_url"] = "https://i.imgur.com/KDhyn44.png";
  }

	if (skill.toLowerCase() == "universal" && !args[0]) {
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
		helpEmbed.color = color;
		helpEmbed.footer = footer;
		helpEmbed.timestamp = new Date();
		return message.channel.send("", {embed: helpEmbed});
	}

	if (args[0].toLowerCase() == "help") {
                let output = "";
                const helpEmbed = data["help"];
                keyList.forEach(k => {
                		if (data[k].title) return;
                        output += `• ${data[k].title}\n`;
                });
                helpEmbed.title = `Comprehensive list of all valid ${skill.toProperCase()} guide commands`;
                helpEmbed.description = output;
								helpEmbed.color = color;
								helpEmbed.footer = footer;
								helpEmbed.timestamp = new Date();
		return message.channel.send("", {embed: helpEmbed});
        }

	if (args[0].toLowerCase() == "all" && level >=2) {
                let i = 0, o = 0, x = keyList.length, errMsg = "";
                //insert skill header switch here
                async function list() {
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
		message.delete();
		return;
        }

	if (Number(args[0])) {
		//number search
		let prev = undefined;
		keyList.forEach(k => {
			const split = k.split(" ");
			const first = Number(split[0]);
			let last = Number(split[2]);
			if (split[3] == "+") last == 121;
			if (args[0] >= first && args[0] < last && !/\bpt\d/.test(k) && !rtnArr.includes(k)) rtnArr.push(k);
			if (args[0] >= first && args[0] < last && /\bpt\d/.test(k)) {
			if (prev && prev !== k.replace(/ \bpt\d/, "")) return;
				const guide = data[k];
				guide.color = color;
				if (/\bpt1/.test(k)) guide.author.name = name;
				if (guide.footer) guide.footer = footer;
				if (guide.timestamp) guide.timestamp = new Date();
				message.channel.send("", {embed: guide});
				pt = "true";
				prev = k.replace(/ \bpt\d/, "");
			}
		});
	} else if (!Number(args[0])) {
		//string search
		let prev = undefined;
		keyList.forEach(k => {
			if (RegExp(args[0].toLowerCase()).test(k) && !/\bpt\d/.test(k) && !rtnArr.includes(k)) rtnArr.push(k);
			if (RegExp(args[0].toLowerCase()).test(k) && /\bpt\d/.test(k)) {
			if (prev && prev !== k.replace(/ \bpt\d/, "")) return;
				const guide = data[k];
				guide.color = color;
				if (/\bpt1/.test(k)) guide.author.name = name;
				if (guide.footer) guide.footer = footer;
				if (guide.timestamp) guide.timestamp = new Date();
				message.channel.send("", {embed: guide});
				pt = "true";
				prev = k.replace(/ \bpt\d/, "");
			}
		});
	}

	if (pt == "true") return;

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
                let second = "";
                let i = 1;
                const searchEmbed = data["search"];
				rtnArr.forEach(n => {
					if (output.length <= 2000) {
						output += `${i}: ${data[rtnArr[i-1]].embed.title}\n`;
					} else if (second.length <= 2000) {
						second += `${i}: ${data[rtnArr[i-1]].embed.title}\n`;
					}
					i++;
				});
                searchEmbed.title = `All ${skill.toProperCase()} guide commands matching your search`;
				searchEmbed.author.name = name;
				searchEmbed.description = output;
				searchEmbed.color = color;
				searchEmbed.footer = footer;
				searchEmbed.timestamp = new Date();
				await message.channel.send("", {embed: searchEmbed});

				if (second.length > 0) {
					searchEmbed.description = second;
					searchEmbed.timestamp = new Date();
					await message.channel.send("", {embed: searchEmbed});
				}

                const response = await client.awaitReply(message, "Which guide were you searching for? Please enter the corresponding number.");
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
	aliases: [],
	permLevel: "User",
	guilds: []
};

exports.help = {
	name: "max",
	category: "Guides",
	description: "An encyclopedia of Max Cape skill guides.",
	usage: "max <help/skill> <help/level/keyword>"
};
