const { data } = require("../guides/thalerGuide.js");

exports.run = async (client, message, args, level) => {

	await message.channel.send('', {embed: data[0]});
	message.channel.send('', {embed: data[1]});

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Administrator",
  guilds: []
};

exports.help = {
  name: "thaler",
  category: "Guides",
  description: "A comprehensive guide on AFKing Minigames for Thaler.",
  usage: "thaler"
};
