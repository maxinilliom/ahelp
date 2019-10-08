const Discord = require("discord.js");
const { inspect } = require("util");
module.exports = async (client, member) => {

	const guild = member.guild;
	if (guild.id !== "382696689812766720") return;
	const settings = client.settings.get(guild.id);
	const welcomeChannel = client.channels.get("382700760317558786");
	const replyChannel = client.channels.get('435588740346413057');
	const logChannel = client.channels.get('407919969712603145');
	const rs = '• 2,162/2,350 achievements or 22,682/24,655 RuneScore';
	const wMsg = `\n\nIf you have any of the following, please let us know and we will assign the correct roles to signify:\n• Max | Comp | MQC | Comp (t) Cape\n• Insane Final Boss or Master of All titles\n${rs}\n• Max Total Virtual Level or Max Experience\n• A HCIM or IM Account you actively play on\n• You are a RS Twitch streamer or YouTuber with more than 50 followers\n\nIf you need help or a community in game, you are welcome to guest in our clan: **'Alright'** on World 68 and join our Friends Chat **'AHelp'**\n\nThanks for joining us! (:\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`;
	const maxUsers = "5";

/*	const collEnd = (coll, arr) => {
		coll.stop();
	}
*/
	const welcome = async () => {
		if (client.newUsers.size == "0") return;
		let userIDs = client.newUsers.map(u => u.id);
		let userArr = client.newUsers.map(u => u.toString());

		client.newUsers.clear();
		let userArrOld = userArr;
		let userIDsOld = userIDs;
		userArr = "";
		userIDs = [];

		if (userArrOld.length > 1) {
			const last = `and ${userArrOld.pop()}`;
			userArrOld.push(last);
		}
		let userList = userArrOld.join(", ");
		const msg = `Welcome in ${userList}!${wMsg}`;
		welcomeChannel.send(msg);
/*		let output = [];
		const msgs = [];

		client.msgColl = new Discord.MessageCollector(welcomeChannel, m => userIDsOld.includes(m.author.id), {maxMatches: userArrOld.length});
		setTimeout(() => {collEnd(client.msgColl, userList)}, 10 * 60 * 1000);
		client.msgColl.on("collect", message => {
			replyChannel.send(`${message.author}: ${message.content}`)
			.then(m => m.delete(600000));
			output.push(`${message.author}: ${message.content}`);
			userIDsOld = userIDsOld.filter(u => u !== message.author.id);
		});
		client.msgColl.on("end", collected => {
			replyChannel.send(`${output.join("\n")}\nAll users' responses logged or timed out for ${userList}`);
		});
*/
	}

	if (client.welcomeTimer._called !== false) client.welcomeTimer = setTimeout(welcome, 5 * 60 * 1000);

	client.newUsers.set(member.id, member.user);

	if (client.newUsers.size == maxUsers) welcome();

}
