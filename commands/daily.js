const { data } = require("../guides/dailyGuide.js");

exports.run = async (client, message, args, level) => {
	const guideName = args.join(" ").toLowerCase();
	const keyList = [];
	const rtnArr = [];
	const name = "Daily Money Making Info";
	const color = 16430082;
	const footer = {
        "icon_url": "https://vignette.wikia.nocookie.net/runescape2/images/3/30/Coins_10000.png/revision/latest",
        "text": "Money, money, money, Lovely money!"
      };

	if (message.channel.id !== '382701090430386180' && level < 2) return;

	Object.getOwnPropertyNames(data).forEach(k => {
		if (k !== "help" && k !== "search") keyList.push(k);
	});
	if (!args[0]) return message.channel.send(`Please specify a valid guide name.`);


	if (args[0].toLowerCase() == "all" && level >= 2) {
    let i = 0, o = 0, x = keyList.length;
		await message.channel.send({
		  files: [{
			attachment: 'media/img/guides/break.png',
			name: 'break.png'
		  }]
		});
		await message.channel.send({
		  files: [{
			attachment: 'media/img/guides/dailyheader.png',
			name: 'Daily Money header.png'
		  }]
		});
		  await message.channel.send({
		  files: [{
			attachment: 'media/img/guides/break.png',
			name: 'break.png'
		  }]
		});
		  
    function list() {
      const guide = data[keyList[o]];
      guide.author.name = name;
      guide.color = color;
      guide.footer = footer;
      guide.timestamp = new Date();
      try {
				message.channel.send("", {embed: guide});
			} catch (err) {
				i--;
			}
      i++;
      o++;
      if (o < x) setTimeout(list, 2500);
			if (o == x) message.reply(`**${i}**/\**${keyList.length}** responses listed.`);
    }
    list();
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
