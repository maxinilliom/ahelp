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
	const fullArr = [];
	let pt = "false";
	const name = "Completionist Cape Info";
	const color = 16316664;
	const gl = client.guideList;
	const msgArr = [];

	if (message.channel.id !== '382701090430386180' && level < 2) return;

	Object.getOwnPropertyNames(data).forEach(k => {
		if (data[k].cmds.includes("comp")) keyList.push(k);
	});
	if (!args[0]) return message.channel.send(`Please specify a valid achievement name.`);

	if (args[0].toLowerCase() == "all" && level >= 2) {
		let i = 0, o = 0, x = keyList.length, errMsg = "";
		if (!gl.has('comp')) gl.set('comp', msgArr)
		await message.channel.send({
		  files: [{
			attachment: 'media/img/guides/break.png',
			name: 'break.png'
		  }]
		}).then(m => msgArr.push(m.id));
		await message.channel.send({
		  files: [{
			attachment: 'media/img/guides/compheader.png',
			name: 'Comp cape header.png'
		  }]
		}).then(m => msgArr.push(m.id));
		  await message.channel.send({
		  files: [{
			attachment: 'media/img/guides/break.png',
			name: 'break.png'
		  }]
		}).then(m => msgArr.push(m.id));
		  
		async function list() {
			const guide = data[keyList[o]].embed;
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
			if (o < x) setTimeout(list, 1000);
			if (o == x) {
          const query = data.cquery.embed;
			  	query.color = color;
			  	query.timestamp = new Date();
			  	await message.channel.send("", {embed: query})
			  		.then(m => msgArr.push(m.id));
			  	message.reply(`**${i}**/\**${keyList.length}** responses listed.\n\n${errMsg}`);
			  	message.channel.send('All message IDs saved.')
			}
		}
		list();
		return message.delete();
	}

	if (args[0].toLowerCase() == "clear" && level >= 2) {
		const cl = gl.get('comp');
		let i = 0, o = 0, x = cl.length, errMsg = "";
		async function clear() {
			const id = cl[o];
			await message.channel.fetchMessage(id)
				.then(msg => msg.delete())
				.catch(err => {
					errMsg += `${o} failed with error: ${err}\n`;
					i--;
				});
				i++;
				o++;

			if (o < x) await client.wait(1500);
			if (o == x) await message.channel.send(`**${i}**/\**${x}** messages removed.\n\n${errMsg}`);
		}
		clear();
		return message.delete();
	}

	if (args[0].toLowerCase() == "help") {
		let output = "";
		let second = "";
		let third = "";
		const helpEmbed = data["help"].embed;
		keyList.forEach(k => {
			if (!data[k].embed.title) return;
			if (output.length <= 2000) {
				output += `• ${data[k].embed.title}\n`;
			} else if (second.length <= 2000) {
				second += `• ${data[k].embed.title}\n`;
			} else {
				third += `• ${data[k].embed.title}\n`;
			}
		});

		helpEmbed.title = "Comprehensive list of all valid Completionst Cape achievement guides";
		helpEmbed.author.name = name;
		helpEmbed.description = output;
		helpEmbed.color = color;
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
			const guide = data[k].embed;
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
		const guide = data[rtnArr[0]].embed;
		guide.author.name = name;
		guide.color = color;
		guide.timestamp = new Date();
		message.channel.send("", {embed: guide});
	} else if (rtnArr.length > 1) {
		let output = "";
		let second = "";
		let i = 1;
		const searchEmbed = data["search"].embed;
		rtnArr.forEach(n => {
			if (output.length <= 2000) {
				output += `${i}: ${data[rtnArr[i-1]].embed.title}\n`;
			} else if (second.length <= 2000) {
				second += `${i}: ${data[rtnArr[i-1]].embed.title}\n`;
			}
			i++;
		});
		searchEmbed.title = "All Completionist Cape achievement guides matching your search";
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
					const choice = data[n].embed;
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
			const choice = data[rtnArr[response-1]].embed;
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
	aliases: [],
	permLevel: "User",
	guilds: []
};

exports.help = {
	name: "comp",
	category: "Guides",
	description: "An encyclopedia of Completionist Cape achievement guides.",
	usage: "comp <help/achievement name>"
};
