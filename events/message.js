// The MESSAGE event runs anytime a message is received
// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.

module.exports = (client, message) => {

	if (message.author.bot) return;

	const settings = message.guild
		? client.settings.get(message.guild.id)
		: client.config.defaultSettings;
		
	if (settings.muteList.includes(message.author.id)) {
		message.delete();
		const muteLog = client.channels.find("id", settings.logChannel);
		muteLog.send(message.author.tag + ": `" + message.content + "`" + " deleted in " + message.channel.toString());
	}
	
	if (message.content.indexOf(settings.prefix) !== 0) return;

	message.settings = settings;

	const cmdstr = message.content.slice(settings.prefix.length);
	const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	const level = client.permlevel(message);
	const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
	if (!cmd) return;
	const guilds = cmd.conf.guilds;

	if (cmd && cmd.conf.guilds.length > 0 && !guilds.includes(message.guild.id))
		return message.channel.send(`\`${command}\` cannot be used on this server.`);

	// if (cmd && !settings.enabledCommands.includes(command) || !settings.enabledCommands.includes(client.aliases.get(command))) 
	// 	return message.channel.send(`\`${command}\` is not enabled on this server.`);

	if (cmd && !message.guild && cmd.conf.guildOnly)
		return message.channel.send(`\`${command}\` is not usable through PM. Please run it in a guild.`);

	if (level < client.levelCache[cmd.conf.permLevel]) {
		if (settings.systemNotice === "true") {
			return message.channel.send(`You do not have permission to use \`${command}.\``);
		} else {
			return;
		}
	}

	message.author.permLevel = level;

	message.flags = [];
	while (args[0] && args [0][0] === "-") {
		message.flags.push(args.shift().slice(1));
	}

	console.log(`CMD: ${client.config.permLevels.find(l => l.level === level).name} ${message.author.username} (${message.author.id}) ran command ${cmdstr}`);
	cmd.run(client, message, args, level);

};