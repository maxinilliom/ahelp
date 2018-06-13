module.exports = async (client, oldMember, newMember) => {
	const { inspect } = require("util");
	const ahelp = client.channels.get('407919969712603145');
	const genVoice = client.channels.get('382696689812766724');
	const eventVoice = client.channels.get('425508386713632771');
	const genText = client.channels.get('456121176641765376');
	const eventText = client.channels.get('456125617860247563');
	let newUserChannel = newMember.voiceChannel ? newMember.voiceChannel : {};
	let oldUserChannel = oldMember.voiceChannel ? oldMember.voiceChannel : {};

	if (oldUserChannel.id == genVoice.id) {
		genText.overwritePermissions(client.users.get(oldMember.user.id), {'VIEW_CHANNEL': false})
	} else
	if (oldUserChannel.id == eventVoice.id) {
		eventText.overwritePermissions(client.users.get(oldMember.user.id), {'VIEW_CHANNEL': false})
	} else
	if (newUserChannel.id == genVoice.id) {
		genText.overwritePermissions(client.users.get(newMember.user.id), {'VIEW_CHANNEL': true})
	} else
	if (newUserChannel.id == eventVoice.id) {
		eventText.overwritePermissions(client.users.get(newMember.user.id), {'VIEW_CHANNEL': true})
	}
};
