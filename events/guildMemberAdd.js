const Discord = require("discord.js");
const { inspect } = require("util");
module.exports = async (client, member) => {

	const guild = member.guild;
	const settings = client.settings.get(guild.id);
	const welcomeChannel = client.channels.get("382700760317558786");
	const replyChannel = client.channels.get('435588740346413057');
	const logChannel = client.channels.get('407919969712603145');
	const wMsg = `\n\nIf you have any of the following, please respond to this message letting us know and we will assign the correct roles to signify:\n• Max | Comp | MQC | Comp (t) Cape\n• Insane Final Boss or Master of All titles\n• 1,693/1,841 achievements or 18,252/19,840 RuneScore\n• Max Total Virtual Level or Max Experience\n• A HCIM or IM Account you actively play on\n• You are a RS Twitch streamer or YouTuber with more than 50 followers\n\nWe also have a friend chat in game: 'Saint Cannon'\n\nThanks for joining us! (:\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`;
	const maxUsers = "5";

	if (client.guilds.get('382696689812766720').memberCount == 2000 && client.twok == "true") {
		welcomeChannel.send(`Congratulations, ${member.toString()}, you are our 2000th member! Contact any Council Member to receive your prize!`);
		welcomeChannel.send(`Thank you to everyone who has joined and supported us on this incredible journey to support and benefit the RuneScape community in every way possible. We appreciate every one of you and all that you do for the server, Achievement Help would be nothing without **you**! ❤️`);
		client.twok = "false";
	}

	const collEnd = (coll, arr) => {
		coll.stop();
	}

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
		let output = [];
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
	}

	if (client.welcomeTimer._called !== false) client.welcomeTimer = setTimeout(welcome, 5 * 60 * 1000);

	client.newUsers.set(member.id, member.user);

	if (client.newUsers.size == maxUsers) welcome();

}
