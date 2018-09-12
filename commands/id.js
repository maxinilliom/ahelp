exports.run = (client, message, args, level) => {

	const type = args[0];
	const search = args.slice(1).join(" ");

	const x = message.guild.roles.find('name', args.join(" ")) !== null
	        ? message.guild.roles.find('name', args.join(" ")).id
	        : "Invalid role name";

	if (type == "c" && message.guild.channels.find('name', search)) {
		message.channel.send(`${search}: ${message.guild.channels.find('name', search).id}`);
	}
	else if (type == "u" && message.guild.members.find(m => m.user.username == search)) {
		message.channel.send(`${search}: ${message.guild.members.find(m => m.user.username == search).user.id}`);
	}
	else if (type == "r" && message.guild.roles.find('name', search)) {
		message.channel.send(`${search}: ${message.guild.roles.find('name', search).id}`);
	}
	else {
		message.channel.send("Something went wrong I guess. ¯\_(ツ)_/¯");
	}

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Administrator",
  guilds: []
};

exports.help = {
  name: "id",
  category: "System",
  description: "Used to collect channel/user/role IDs.",
  usage: "id <c/u/r> <name>"
};
