module.exports = async (client, oldMember, newMember) => {

	const { inspect } = require("util");

	let newUserChannel = newMember.voiceChannel ? newMember.voiceChannel : {};
	let oldUserChannel = oldMember.voiceChannel ? oldMember.voiceChannel : {};

	oldUserChannel.permissionOverwrites = {}, oldUserChannel.guild = {};
	newUserChannel.permissionOverwrites = {}, newUserChannel.guild = {};

	client.users.get('97928972305707008').send(inspect(oldUserChannel), {code: "json"})
	client.users.get('97928972305707008').send(inspect(newUserChannel), {code: "json"})

};
