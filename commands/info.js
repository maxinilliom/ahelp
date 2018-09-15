const { inspect } = require("util");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);

exports.run = (client, message, args, level) => {

	const { data } = require(`../info/${args[0]}.js`);
	const embeds = Object.getOwnPropertyNames(data);
	let i = 0, o = 0, x = embeds.length, errMsg = "";
	async function list() {
		const curr = data[embeds[o]];
		const embed = curr.description || curr.fields ? {embed: curr} : curr;
		const channelName = message.channel.name.toProperCase().replace("-", " ");
		if (curr.footer) curr.footer.text = `Achievement Help | ${channelName}`;
//		guide.color = undefined; //update - maybe switch?
		try {
			await message.channel.send("", embed);
		} catch (err) {
			errMsg += `${o}. ${embeds[o]} failed to send with error: ${err}\n`;
			i--;
		}
		i++;
		o++;
		if (o < x) setTimeout(list, 2500);
		if (o == x) message.reply(`**${i}**/\**${embeds.length}** responses listed.\n\n${errMsg}`);
	}
	list();
	return message.delete();

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Administrator",
  guilds: []
};

exports.help = {
  name: "info",
  category: "System",
  description: "Posts server info to desired channel.",
  usage: "info <type> <channel>"
};
