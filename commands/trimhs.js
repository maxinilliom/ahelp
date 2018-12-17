exports.run = async (client, message, args, level) => {

	const embed = {
    "embed": {
      "author": {
        "name": "Trimmed Completionist Cape Highscores",
        "icon_url": "https://vignette.wikia.nocookie.net/runescape2/images/7/77/RuneScore.png"
      },
      "description": "\nThe Trim Highscores is a list of all players who have claimed a Trimmed completionist cape since its introduction into the game in 2011. The list is posted on the High Level Forums and you can also view it from google documents below.",
      "color": 2927667,
      "fields": [
        {
          "name": "Google Sheets link",
          "value": "[Trim Highscores](https://docs.google.com/spreadsheets/d/1J8LXl-z_--wVz9fj2tc8bR-TtuShYFBLYgfNReCKKqw)"
        }
      ],
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
  aliases: [],
  permLevel: "User",
  guilds: []
};

exports.help = {
  name: "trimhs",
  category: "Information",
  description: "Link to the Google Sheets document containing a list of all Trimmed Completionist players in order.",
  usage: "trimhs"
};
