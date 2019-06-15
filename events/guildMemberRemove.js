module.exports = (client, member) => {
	const settings = client.settings.get(member.guild.id);
	const logChannel = client.channels.get('407919969712603145');
	const guild = member.guild;
	if (guild.id !== "382696689812766720") return;
	
	const newUsers = client.newUsers;
	if (newUsers.has(member.id)) {
		newUsers.delete(member.id);
	}
}
