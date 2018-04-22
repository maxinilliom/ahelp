const Discord = require("discord.js");
const { inspect } = require("util");
module.exports = async (client, member) => {

	const guild = member.guild;
	const settings = client.settings.get(guild.id);
	const welcomeChannel = client.channels.get("382700760317558786");
	const replyChannel = client.channels.get('435588740346413057');
	const logChannel = client.channels.get('407919969712603145');
	const wMsg = `\n\nIf you have any of the following, please respond to this message letting us know and we will assign the correct roles to signify:\n• Max | Comp | MQC | Comp (t) Cape\n• Insane Final Boss or Master of All titles\n• 1,699 achievements or 18,156 RuneScore\n• Max Total Virtual Level or Max Experience\n• A HCIM or IM Account you actively play on\n• You are a RS Twitch streamer or YouTuber with more than 50 followers\n\nWe also have a friend chat in game: 'Saint Cannon'\n\nThanks for joining us! (:\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`;
	const maxUsers = "5";

	const welcome = async () => {
		if (client.newUsers.size == "0") return;
		let userIDs = client.newUsers.map(u => u.id);
		let userArr = client.newUsers.map(u => u.toString());

		client.newUsers.clear();

		if (userArr.length > 2) {
			const last = `and ${userArr.pop()}`;
			userArr.push(last);
		}
		let userList = userArr.join(", ");
		const msg = `Welcome in ${userList}!${wMsg}`;
		welcomeChannel.send(msg);
		let output = [];

		client.msgColl = new Discord.MessageCollector(replyChannel, m => userIDs.includes(m.author.id), {maxMatches: userArr.length});

		client.msgColl.on("collect", message => {
			output.push(`${message.author}: ${message.content}`);
			userIDs = userIDs.filter(u => u !== message.author.id);
		});
		await client.msgColl.on("end", collected => {
			replyChannel.send(output);
		});
	}

	if (client.welcomeTimer._called !== false) client.welcomeTimer = setTimeout(welcome, 5 * 60 * 1000);

	client.newUsers.set(member.id, member.user);

	if (client.newUsers.size == maxUsers) welcome();

}
