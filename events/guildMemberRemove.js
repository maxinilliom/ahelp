module.exports = (client, member) => {
	const settings = client.settings.get(member.guild.id);
	const logChannel = client.channels.get('407919969712603145');
	const newUsers = client.newUsers;
	if (newUsers.has(member.id)) {
		newUsers.delete(member.id);
		logChannel.send(`${member.toString()} removed from Collection.`);
	}
}
