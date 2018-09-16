const { data } = require("../guides/reaperGuide.js");

exports.run = async (client, message, args, level) => {
	const guideName = args.join(" ").toLowerCase();
	const keyList = [];
	const rtnArr = [];
	let pt = "false";
	const name = "Reaper Info";
	const color = 13480569;
	const footer = {
        "icon_url": "https://i.imgur.com/NJmVzyZ.png",
        "text": "All first time reaper kills are free in #reaper-request-list!"
      };
    if (guideName.includes("solak")) footer.text = "Check #reaper-request-list for information about leeching services and discounts.";

//	if (message.channel.id !== '407919969712603145' && level < 2) return;

	Object.getOwnPropertyNames(data).forEach(k => {
		if (k !== "help" && k !== "search") keyList.push(k);
	});
	if (!args[0]) return message.channel.send(`Please specify a valid boss name.`);


	if (args[0].toLowerCase() == "all" && level >= 2) {
    let i = 0, o = 0, x = keyList.length, errMsg = "";
		await message.channel.send({
		  files: [
		  {
			attachment: 'media/img/guides/break.png',
			name: 'break.png'
		  },
		  {
			attachment: 'media/img/guides/reaperheader.png',
			name: 'Reaper kill header.png'
		  },
		  {
			attachment: 'media/img/guides/break.png',
			name: 'break.png'
		  }]
		});
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

		helpEmbed.title = "Comprehensive list of all valid 1KC Reaper guides";
		helpEmbed.author.name = name;
		helpEmbed.description = output;
		helpEmbed.color = color;
		helpEmbed.footer = footer;
		helpEmbed.timestamp = new Date();
		await message.channel.send("", {embed: helpEmbed});

		const helpMsg = message.channel.id == '382701090430386180'
			? `To search for a boss, use **.${exports.help.name}** <keyword>.`
			: `To search for a boss, use **.${exports.help.name}** <keyword> in the <#382701090430386180> channel.`
		message.channel.send(helpMsg);
		return;

	}

	let prev = undefined;
	keyList.forEach(k => {
		if (RegExp(guideName).test(k) && !/\bpt\d/.test(k) && !rtnArr.includes(k)) rtnArr.push(k);
		if (RegExp(guideName).test(k) && /\bpt\d/.test(k)) {
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
		searchEmbed.timestamp = new Date();
		message.channel.send("", {embed: searchEmbed});
		const response = await client.awaitReply(message, "Which boss were you searching for? Please enter the corresponding number.");
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
