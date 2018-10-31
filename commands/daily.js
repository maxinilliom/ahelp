const { data } = require("../guides/dailyGuide.js");

exports.run = async (client, message, args, level) => {
	const guideName = args.join(" ").toLowerCase();
	if (guideName.length < 3) return message.channel.send('Search terms should be a minimum of **3** characters. Please try again.');
	const keyList = [];
	const rtnArr = [];
	const name = "Daily Money Making Info";
	const color = 16430082;
	const footer = {
        "icon_url": "https://vignette.wikia.nocookie.net/runescape2/images/3/30/Coins_10000.png/revision/latest",
        "text": "Money, money, money, Lovely money!"
      };
	const gl = client.guideList;
	const msgArr = [];

	if (message.channel.id !== '382701090430386180' && level < 2) return;

	Object.getOwnPropertyNames(data).forEach(k => {
		if (k !== "help" && k !== "search" && k !== "query") keyList.push(k);
	});
	if (!args[0]) return message.channel.send(`Please specify a valid guide name.`);


	if (args[0].toLowerCase() == "all" && level >= 2) {
    let i = 0, o = 0, x = keyList.length, errMsg = "";
		if (!gl.has('daily')) gl.set('daily', msgArr);
		msgArr.push(message.channel.id);
		await message.channel.send({
		  files: [{
			attachment: 'media/img/guides/break.png',
			name: 'break.png'
		  }]
		}).then(m => msgArr.push(m.id));
		await message.channel.send({
		  files: [{
			attachment: 'media/img/guides/dailyheader.png',
			name: 'Daily Money header.png'
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
      guide.author.name = name;
      guide.color = color;
      guide.footer = footer;
      guide.timestamp = new Date();
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
				gl.set('daily', msgArr);
		  	await message.reply(`**${i}**/\**${keyList.length}** responses listed.\n\n${errMsg}`)
		  		.then(m => m.delete(10000));
		  	await message.channel.send('All message IDs saved.')
		  		.then(m => m.delete(5000));
		  }
    }
    list();
		return message.delete();
	}

	if (args[0].toLowerCase() == "clear" && level >= 2) {
		if (!gl.has('daily')) return message.channel.send('No messages are currently stored for **daily**.');
		let cl = gl.get('daily');
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
				gl.delete('daily');
				await message.channel.send('All **daily** guides deleted from memory.')
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
			if (output.length <= 2000) {
				output += `• ${data[k].title}\n`;
			}
		});

		helpEmbed.title = "Comprehensive list of all valid Daily Money Making guides";
		helpEmbed.author.name = name;
		helpEmbed.description = output;
		helpEmbed.color = color;
		helpEmbed.footer = footer;
		helpEmbed.timestamp = new Date();
		await message.channel.send("", {embed: helpEmbed});

		const helpMsg = message.channel.id == '382701090430386180'
			? `To search for a guide, use **.${exports.help.name}** <keyword>.`
			: `To search for a guide, use **.${exports.help.name}** <keyword> in the <#382701090430386180> channel.`
		message.channel.send(helpMsg);
		return;

	}

	keyList.forEach(k => {
		if (RegExp(guideName).test(k) && !rtnArr.includes(k)) rtnArr.push(k);
	});

	if (rtnArr.length == 0) {
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
		searchEmbed.title = "All Daily Money Making guides matching your search";
		searchEmbed.author.name = name;
		searchEmbed.description = output;
		searchEmbed.color = color;
		searchEmbed.footer = footer;
		searchEmbed.timestamp = new Date();
		message.channel.send("", {embed: searchEmbed});
		const response = await client.awaitReply(message, "Which guide were you searching for? Please enter the corresponding number.");
		if (isNaN(response) || response > rtnArr.length || response < 1) return message.channel.send("Invalid number specified, search cancelled.");
		const choice = data[rtnArr[response-1]];
		choice.author.name = name;
		choice.color = color;
		choice.footer = footer;
		choice.timestamp = new Date();
		return message.channel.send("", {embed: choice});
	} else {
	message.channel.send("If you see this, contact <@97928972305707008>");
	}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
  guilds: []
};

exports.help = {
  name: "daily",
  category: "Guides",
  description: "A collection of daily money making guides.",
  usage: "daily <help/guide name>"
};
