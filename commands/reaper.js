const { data } = require("../guides/reaperGuide.js");

exports.run = async (client, message, args, level) => {
	const guideName = args.join(" ").toLowerCase();
	if (guideName.length < 3) return message.channel.send('Search terms should be a minimum of **3** characters. Please try again.');
	const keyList = [];
	const rtnArr = [];
	const fullArr = [];
	let pt = "false";
	const name = "Reaper Info";
	const color = 13480569;
	const footer = {
        "icon_url": "https://i.imgur.com/NJmVzyZ.png",
        "text": "All first time reaper kills are free in #reaper-request-list!"
      };
	const gl = client.guideList;
	const msgArr = [];
  if (guideName.includes("solak")) footer.text = "Check #reaper-request-list for information about leeching services and discounts.";

	if (message.guild.id == "382696689812766720" && message.channel.id !== '382701090430386180' && level < 2) return;

	Object.getOwnPropertyNames(data).forEach(k => {
		if (k !== "help" && k !== "search" && k !== "query") keyList.push(k);
	});
	if (!args[0]) return message.channel.send(`Please specify a valid boss name.`);


	if (message.guild.id == "382696689812766720" && args[0].toLowerCase() == "all" && level >= 2) {
    let i = 0, o = 0, x = keyList.length, errMsg = "", fin = "";
		if (!gl.has('reaper')) gl.set('reaper', []);
		msgArr.push(message.channel.id);
		await message.channel.send({
		  files: [{
			attachment: 'media/img/guides/break.png',
			name: 'break.png'
		  }]
		}).then(m => msgArr.push(m.id));
		await message.channel.send({
		  files: [{
			attachment: 'media/img/guides/reaperheader.png',
			name: 'Reaper kill header.png'
		  }]
		}).then(m => msgArr.push(m.id));
		  await message.channel.send({
		  files: [{
			attachment: 'media/img/guides/break.png',
			name: 'break.png'
		  }]
		}).then(m => msgArr.push(m.id));
		  
    async function list() {
      const guide = data[keyList[o]];
      guide.color = color;
      if (guide.author) guide.author.name = name;
      if (guide.footer) guide.footer = footer;
      if (guide.timestamp) guide.timestamp = undefined;
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
		  	query.timestamp = undefined;
		  	await message.channel.send("", {embed: query})
		  		.then(m => msgArr.push(m.id));
		  		if (gl.get('reaper') && gl.get('reaper').length > 0) {
		  			fin = "Message IDs already exist for **reaper** guides. Message IDs not saved to prevent overwriting.";
		  		} else {
		  			gl.set('reaper', msgArr);
		  			fin = "All message IDs saved to **reaper**.";
		  		}
		  	await message.reply(`**${i}**/\**${keyList.length}** responses listed.\n\n${errMsg}`)
	  			.then(m => m.delete(10000));
		  	await message.channel.send(fin)
		  		.then(m => m.delete(5000));
		  }
    }
    list();
		return message.delete();
	}

	if (message.guild.id == "382696689812766720" && args[0].toLowerCase() == "clear" && level >= 2) {
		if (!gl.has('reaper')) return message.channel.send('No messages are currently stored for **reaper**.');
		let cl = gl.get('reaper');
		const channel = cl[0];
		if (message.channel.id !== channel) return message.channel.send(`Please use this command in the <#${message.guild.channels.get(channel).id}> channel that the embeds were originally sent in.`);
		cl = cl.slice(1);
		let i = 0, o = 0, x = cl.length, errMsg = "";
		async function clear() {
			const id = cl[o];
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
				gl.delete('reaper');
				await message.channel.send('All **reaper** guides deleted from memory.')
					.then(m => m.delete(5000));
			}
		}
		clear();
		return message.delete();
	}

	if (args[0].toLowerCase() == "help") {
		let output = "";
		const helpEmbed = data["help"];
		keyList.forEach(k => {
			if (!data[k].title) return;
			if (output.length <= 2000) {
				output += `• ${data[k].title}\n`;
			}
		});

		helpEmbed.title = "reaperrehensive list of all valid 1KC Reaper guides";
		helpEmbed.author.name = name;
		helpEmbed.description = output;
		helpEmbed.color = color;
		helpEmbed.footer = footer;
		helpEmbed.timestamp = undefined;
		await message.channel.send("", {embed: helpEmbed});

		const helpMsg = message.channel.id == '382701090430386180'
			? `To search for a boss, use **.${exports.help.name}** <keyword>.`
			: `To search for a boss, use **.${exports.help.name}** <keyword> in the <#382701090430386180> channel.`
		message.channel.send(helpMsg);
		return;

	}

	let prev = undefined;
	keyList.forEach(k => {
		if (RegExp(guideName).test(k) && !/\bpt\d/.test(k) && !rtnArr.includes(k)
			|| RegExp(guideName).test(k) && /\bpt1/.test(k) && !rtnArr.includes(k)) rtnArr.push(k);
		if (RegExp(guideName).test(k)&& !fullArr.includes(k)) fullArr.push(k);
		if (RegExp(guideName).test(k) && /\bpt\d/.test(k)) {
			if (rtnArr.length > 1) return;
			if (prev && prev !== k.replace(/ \bpt\d/, "")) return;
			const guide = data[k];
			guide.color = color;
			if (/\bpt1/.test(k)) guide.author.name = name;
			if (guide.footer) guide.footer = footer;
			if (guide.timestamp) guide.timestamp = undefined;
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
		guide.footer = footer;
		guide.timestamp = undefined;
		message.channel.send("", {embed: guide});
	} else if (rtnArr.length > 1) {
		let output = "";
		let i = 1;
		const searchEmbed = data["search"];
		rtnArr.forEach(n => {
			output += `${i}: ${data[rtnArr[i-1]].title}\n`;
			i++;
		});
		searchEmbed.title = "All 1KC Reaper guides matching your search";
		searchEmbed.author.name = name;
		searchEmbed.description = output;
		searchEmbed.color = color;
		searchEmbed.footer = footer;
		searchEmbed.timestamp = undefined;
		message.channel.send("", {embed: searchEmbed});
		const response = await client.awaitReply(message, "Which boss were you searching for? Please enter the corresponding number.");
		if (isNaN(response) || response > rtnArr.length || response < 1) return message.channel.send("Invalid number specified, search cancelled.");
		
		if (/\bpt\d/.test(rtnArr[response-1])) {
			const title = rtnArr[response-1];
			const replace = new RegExp(title.replace(/ \bpt\d/, ""));
			fullArr.forEach(n => {
				if (replace.test(n)) {
					const choice = data[n];
					choice.color = color;
					if (choice.author) choice.author.name = name;
					if (choice.timestamp) choice.timestamp = undefined;
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
			choice.timestamp = undefined;
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
  aliases: ["boss"],
  permLevel: "User",
  guilds: []
};

exports.help = {
  name: "reaper",
  category: "Guides",
  description: "Guides to get you your first kill on any and all RuneScape bosses.",
  usage: "reaper <help/boss name>"
};
