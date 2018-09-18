const { data } = require("../guides/thalerGuide.js");

exports.run = async (client, message, args, level) => {

  if (message.channel.id !== '382701090430386180' && level < 2) return;

    await message.channel.send({
      files: [{
      attachment: 'media/img/guides/break.png',
      name: 'break.png'
      }]
    });
    await message.channel.send({
      files: [{
      attachment: 'media/img/guides/thalerheader.png',
      name: 'AFK Thaler header.png'
      }]
    });
    await message.channel.send({
      files: [{
      attachment: 'media/img/guides/break.png',
      name: 'break.png'
      }]
    });
      
	await message.channel.send('', {embed: data[0]});
	await message.channel.send('', {embed: data[1]});
	message.delete();
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User",
  guilds: []
};

exports.help = {
  name: "thaler",
  category: "Guides",
  description: "A comprehensive guide on AFKing Minigames for Thaler.",
  usage: "thaler"
};
