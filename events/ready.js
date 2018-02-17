module.exports = async client => {

	await client.wait(1000);
	console.log(`Ready: ${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`);
	client.guilds.filter(g => !client.settings.has(g.id)).forEach(g => client.settings.set(g.id, client.config.defaultSettings));
	client.channels.find("id", "407919969712603145").send(`${client.user.tag}, ready to serve ${client.users.size} users.`);
};