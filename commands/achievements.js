exports.run = async (client, message, args, level) => {

	const embed = {
    "embed": {
      "author": {
        "name": "Comprehensive list of new achievements",
        "icon_url": "https://vignette.wikia.nocookie.net/runescape2/images/7/77/RuneScore.png"
      },
      "description": "\nIf you are looking to complete the 142 new achievements released in the Achievement Bonanza update and bump up your RuneScore, check out [this page](https://runescape.wiki/w/User:Salix_of_Prifddinas/Achievement_Bonanza) on the RuneScape Wiki for a list of them all.\n\nAll thanks to <@220616902857195521>!",
      "color": 2927667,
      "footer": {
        "icon_url": message.guild.iconURL,
        "text": message.guild.name
      }
    }
  };

  embed.embed.timestamp = new Date();
  message.channel.send(embed);
//  message.delete();

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ach", "achieve", "achievement", "bonanza", "cheevos"],
  permLevel: "User",
  guilds: []
};

exports.help = {
  name: "achievements",
  category: "Information",
  description: "Link to the RS Wiki page for all achievements added with the Achievement Bonanza.",
  usage: "achievements"
};
