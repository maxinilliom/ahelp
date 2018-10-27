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
	const achName = args.join(" ").toLowerCase();
	const keyList = [];
	const rtnArr = [];
	const fullArr = [];
	let pt = "false";
	const name = "RuneScore Info";
	const color = 2011148;
	const cats = ["combat", "exploration", "minigames", "miscellaneous", "skills"];
	const category = args[1] ? args[1].toLowerCase() : undefined;
	const nick = category ? category : "main";
	const gl = client.guideList;
	const msgArr = [];

	if (message.channel.id !== '382701090430386180' && level < 2) return;

	Object.getOwnPropertyNames(data).forEach(k => {
		if (k !== "help" && k !== "search" && k !== "query") {
			keyList.push(k);
			if (!data[k].title) return;
			const [cat, sub, ach] = k.split(" - ");
			if (!data[k].title.includes(`(${cat.toProperCase()}, ${sub.toProperCase()})`)) {
				data[k].title = `${data[k].title} (${cat.toProperCase()}, ${sub.toProperCase()})`;
			}
		}
	});
	if (!args[0]) return message.channel.send(`Please specify a valid achievement name.`);
	const catList = keyList.filter(k => k.split(" - ")[0].includes(category));

	if (args[0].toLowerCase() == "all" && level >= 2) {
		let i = 0, o = 0, errMsg = "";
		const x = category ? catList.length : keyList.length;
		if (!gl.has('rs')) gl.set('rs', {});
		msgArr.push(message.channel.id);
		await message.channel.send({
		  files: [{
			attachment: 'media/img/guides/break.png',
			name: 'break.png'
		  }]
		}).then(m => msgArr.push(m.id));
		await message.channel.send({
		  files: [{
			attachment: 'media/img/guides/rsheader.png',
			name: 'RuneScore header.png'
		  }]
		}).then(m => msgArr.push(m.id));
		  await message.channel.send({
		  files: [{
			attachment: 'media/img/guides/break.png',
			name: 'break.png'
		  }]
		}).then(m => msgArr.push(m.id));

		if (category && !cats.includes(category)) return message.channel.send(`**${category}** is not a valid category.`);
		//add category header switch here
		async function list() {
			const [cat, sub, ach] = category ? catList[o].split(" - ") : keyList[o].split(" - ");
			if (category) {
				const guide = data[catList[o]];
				guide.color = color;
				if (guide.author) guide.author.name = name;
				if (guide.timestamp) guide.timestamp = new Date();
				try {
					await message.channel.send("", {embed: guide})
						.then(m => msgArr.push(m.id));
				} catch (err) {
					errMsg += `${o}. ${catList[o]} failed to send with error: ${err}\n`;
					i--;
				}
				i++;
				o++;
				if (o < x) setTimeout(list, 2000);
				if (o == x) {
	      	const query = data.query;
			  	query.color = color;
			  	query.timestamp = new Date();
			  	await message.channel.send("", {embed: query})
						.then(m => msgArr.push(m.id));
			  	const cl = gl.get('rs');
			  	cl[nick] = msgArr;
			  	gl.set('rs', cl);
			  	await message.reply(`**${i}**/\**${catList.length}** responses listed.\n\n${errMsg}`)
		  			.then(m => m.delete(10000));
			  	await message.channel.send('All message IDs saved.')
			  		.then(m => m.delete(5000));
			  }
			} else {
				const guide = data[keyList[o]];
				guide.color = color;
				if (guide.author) guide.author.name = name;
				if (guide.timestamp) guide.timestamp = new Date();
				try {
					await message.channel.send("", {embed: guide})
						.then(m => msgArr.push(m.id));
				} catch (err) {
					errMsg += `${o}. ${keyList[o]} failed to send with error: ${err}\n`;
					i--;
				}
				i++;
				o++;
				if (o < x) setTimeout(list, 2000);
				if (o == x) {
	      	const query = data.query;
			  	query.color = color;
			  	query.timestamp = new Date();
			  	await message.channel.send("", {embed: query})
						.then(m => msgArr.push(m.id));
			  	const cl = gl.get('rs');
			  	cl[nick] = msgArr;
			  	gl.set('rs', cl);
			  	await message.reply(`**${i}**/\**${keyList.length}** responses listed.\n\n${errMsg}`)
		  			.then(m => m.delete(10000));
			  	await message.channel.send('All message IDs saved.')
			  		.then(m => m.delete(5000));
			  	}
			  }
		}
		list();
		return message.delete();
	}

	if (args[0].toLowerCase() == "clear" && level >= 2) {
		const cl = gl.get('rs');
		if (!cl[nick]) return message.channel.send(`No messages are currently stored for **${nick}**.`);
		let nl = cl[nick];
		const channel = nl[0];
		if (message.channel.id !== channel) return message.channel.send(`Please use this command in the <#${message.guild.channels.get(channel).id}> channel that the embeds were originally sent in.`);
		nl = nl.slice(1);
		let i = 0, o = 0, x = nl.length, errMsg = "";
		async function clear() {
			const id = nl[o];
			try {
				await message.channel.fetchMessage(id)
					.then(msg => msg.delete());
				} catch (err) {
					errMsg += `${o} failed with error: ${err}\n`;
					i--;
				};
				i++;
				o++;

			if (o < x) {
				await client.wait(1500);
				clear();
			}
			if (o == x) {
				await message.reply(`**${i}**/\**${x}** messages removed.\n\n${errMsg}`)
					.then(m => m.delete(10000));
				delete cl[nick];
				gl.set('rs', cl);
				await message.channel.send(`All **${nick}** guides deleted from memory.`)
					.then(m => m.delete(5000));
			}
		}
		clear();
		return message.delete();
	}

	if (args[0].toLowerCase() == "help") {
		let output = "";
		let second = "";
		let third = "";
		let fourth = "";
		let fifth = "";
		let sixth = "";
		let seventh = "";
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
			} else if (fifth.length <= 1950) {
				fifth += `• ${data[k].title}\n`;
			} else if (sixth.length <= 1950) {
				sixth += `• ${data[k].title}\n`;
			} else if (seventh.length <= 1950) {
				seventh += `• ${data[k].title}\n`;
			}
		});
		helpEmbed.title = "Comprehensive list of all valid RuneScore achievement guides";
		helpEmbed.author.name = name;
		helpEmbed.description = output;
		helpEmbed.color = color;
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

		if (fifth.length > 0) {
			helpEmbed.description = fifth;
			helpEmbed.timestamp = new Date();
			await message.channel.send("", {embed: helpEmbed});
		}

		if (sixth.length > 0) {
			helpEmbed.description = sixth;
			helpEmbed.timestamp = new Date();
			await message.channel.send("", {embed: helpEmbed});
		}

		if (seventh.length > 0) {
			helpEmbed.description = seventh;
			helpEmbed.timestamp = new Date();
			await message.channel.send("", {embed: helpEmbed});
		}

		const helpMsg = message.channel.id == '382701090430386180'
			? `To search for an achievement, use **.${exports.help.name}** <keyword>.`
			: `To search for an achievement, use **.${exports.help.name}** <keyword> in the <#382701090430386180> channel.`
		message.channel.send(helpMsg);
		return;
	}

	let prev = undefined;
	keyList.forEach(k => {
		if (RegExp(achName).test(k) && !/\bpt\d/.test(k) && !rtnArr.includes(k)
			|| RegExp(achName).test(k) && /\bpt1/.test(k) && !rtnArr.includes(k)) rtnArr.push(k);
		if (RegExp(achName).test(k)&& !fullArr.includes(k)) fullArr.push(k);
		if (RegExp(achName).test(k) && /\bpt\d/.test(k)) {
			if (rtnArr.length > 1) return;
			if (prev && prev !== k.replace(/ \bpt\d/, "")) return;
			const guide = data[k];
			guide.color = color;
			if (/\bpt1/.test(k)) guide.author.name = name;
			if (guide.timestamp) guide.timestamp = new Date();
			message.channel.send("", {embed: guide});
			pt = "true";
			prev = k.replace(/ \bpt\d/, "");
		}
	});

	if (pt == "true") return;

	if (rtnArr.length == 0 && pt == "false") {
		return message.channel.send(`No results found for **${args.join(" ")}**.`);
	} else if (rtnArr.length == 1) {
		const guide = data[rtnArr[0]];
		guide.author.name = name;
		guide.color = color;
		guide.timestamp = new Date();
		message.channel.send("", {embed: guide});
	} else if (rtnArr.length > 1) {
		let output = "";
		let second = "";
		let i = 1;
		const searchEmbed = data["search"];
		rtnArr.forEach(n => {
			if (!data[n].title) return;
			else if (output.length <= 2000) {
				output += `${i}: ${data[n].title}\n`;
			} else if (second.length <= 2000) {
				second += `${i}: ${data[n].title}\n`;
			}
			i++;
		});
		searchEmbed.title = "All RuneScore achievement guides matching your search";
		searchEmbed.author.name = name;
		searchEmbed.description = output;
		searchEmbed.color = color;
		searchEmbed.timestamp = new Date();
		await message.channel.send("", {embed: searchEmbed});

		if (second.length > 0) {
			searchEmbed.description = second;
			searchEmbed.timestamp = new Date();
			await message.channel.send("", {embed: searchEmbed});
		}

		const response = await client.awaitReply(message, "Which achievement were you searching for? Please enter the corresponding number.");
		if (isNaN(response) || response > rtnArr.length || response < 1) return message.channel.send("Invalid number specified, search cancelled.");

		if (/\bpt\d/.test(rtnArr[response-1])) {
			const title = rtnArr[response-1];
			const replace = new RegExp(title.replace(/ \bpt\d/, ""));
			fullArr.forEach(n => {
				if (replace.test(n)) {
					const choice = data[n];
					choice.color = color;
					if (choice.author) choice.author.name = name;
					if (choice.timestamp) choice.timestamp = new Date();
					message.channel.send("", {embed: choice});
					pt = "true";
				}
			});
		}
		else {
			if (pt == "true") return;
			const choice = data[rtnArr[response-1]];
			choice.author.name = name;
			choice.color = color;
			choice.timestamp = new Date();
			return message.channel.send("", {embed: choice});
		}
	} else if (pt == "true") {
		return;
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
