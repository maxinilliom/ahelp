exports.run = async (client, message, args, level) => {

	const { inspect } = require("util");
	const clues = require('../clues.js');

	const rsns = client.scavrsns;
	const teams = client.scavteams;

	if (!isNaN(args[0])) return message.channel.send(clues[args[0]], {type: "json"});

	if (args[0].toLowerCase() == 'rsn') {
		if (!args[1]) return message.channel.send('Please enter a valid RSN to link your Discord username with.');
		args.shift();
		const rsn = args.join(" ").toLowerCase();
		if (rsn.length > 12) return message.channel.send('Please enter a valid RSN to link your Discord username with.');
		const x = client.scav.get(message.author.id) ? client.scav.get(message.author.id) : {};
		if (rsn == x.rsn) return message.channel.send(`Your RSN is already set as ${rsn}.`);
		if (rsns.includes(rsn)) return message.channel.send('That RSN is already tied to another account. If you believe this is in error, please contact an event admin.');
		if (x.rsn) return message.channel.send(`You have already registered your RSN as **${x.rsn}**. If this is incorrect, please contact an event admin.`);
		message.channel.send(`Registered RSN: ${rsn}`);
		x.discord = message.author.tag;
		x.rsn = rsn;
		client.scav.set(message.author.id, x);
		rsns.push(rsn);
	} else
	if (args[0].toLowerCase() == 'team') {
		args.shift();
		const team = args.join(" ").toLowerCase();
		const x = client.scav.get(message.author.id) ? client.scav.get(message.author.id) : {};
		if (!x.rsn) return message.channel.send('Please link your RSN with your Discord username before joining a team. Use **.scav rsn <rsn>**.');
		if (x.team) return message.channel.send(`You have already registered your team as **${x.team}**. If this is incorrect, please contact an event admin.`);
		const cTeam = client.scavteams.get(team) ? client.scavteams.get(team) : [];
		if (cTeam.length > 4) return message.channel.send(`Team **${cTeam}** has too many members already.`);
		cTeam.push(x.rsn);
		x.team = team;
		client.scavteams.set(team, cTeam);
		client.scav.set(message.author.id, x);
		message.channel.send(`Registered team: ${team}`);
	} else
	if (args[0].toLowerCase() == 'info') {
		if (args[1]) {
			args.shift();
			const rsnS = args.join(" ");
			const x = client.scav.find('rsn', rsnS) ? client.scav.find('rsn', rsnS) : {};
			const rsn = x.rsn ? x.rsn : "N/A";
			const team = x.team ? x.team : "N/A";
			const discord = x.discord ? x.discord : "N/A";
			return message.channel.send(`RSN: ${rsn}\nTeam: ${team}\nUser: ${discord}`);
		}
		const x = client.scav.get(message.author.id) ? client.scav.get(message.author.id) : {};
		const rsn = x.rsn ? x.rsn : "N/A";
		const team = x.team ? x.team : "N/A";
		message.channel.send(`RSN: ${rsn}\nTeam: ${team}`);
	} else
	if (args[0].toLowerCase() == 'clear') {
		const response = await client.awaitReply(message, 'Are you sure that you want to clear all gathered data for the current scavenger hunt?');
		if (['y','yes'].includes(response)) {
			client.scav.clear();
			client.scavteams.clear();
			client.scavrsns = [];
			message.channel.send('Collection cleared.');
		} else
		if (['n','no','cancel'].includes(response)) {
			return message.channel.send('Clearing collection cancelled.');
		}
	} else
	if (args[0].toLowerCase() == 'log') {
		args.shift();
		const point = args.shift();
		const rsn = args.join(" ").toLowerCase();
		message.channel.send(`${message.author.tag}: logging **${rsn}**.`);
		const x = client.scav.find('rsn', rsn) ? client.scav.find('rsn', rsn) : {};
		x[point] = new Date();
		client.scav.set(x.discord, x);
	} else
	if (args[0].toLowerCase() == 'start') {
		const parts = client.scav.keyArray();
		parts.forEach(p => {
			client.users.get(p).send('test');
		});
	}
};

exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner",
  guilds: []
};

exports.help = {
  name: "scav",
  category: "Event",
  description: "Use for scavenger events.",
  usage: "scav <rsn/team>"
};
