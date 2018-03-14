exports.run = (client, message, args, level) => {
	const test = {
		"title": "Diaries of the Clans",
		"author": {
			"name": "Cape Info",
			"icon_url": "https://i.imgur.com/6c6q2iC.png"
		},
		"description": "[Diaries of the Clans](http://runescape.wikia.com/wiki/Diaries_of_the_Clans) is a meta-achievement that requires the player to completely fill the Voice of the Elders by running laps on the Hefin Agility Course. One page is received every 20 laps, and a total of eight are needed to complete the book.",
		"thumbnail": {
			"url": "https://i.imgur.com/Shmagnp.png"
		},
		"fields": [
				{
				"name": "Clan",
				"value": "Cadarn                20\nCrwys                 40\nIorwerth             60\nTrahaearn          80\nAmlodd             100\nHefin                  120\nIthell                   140\nMeilyr                160",
				"inline": true
				},
				{
				"name": "Requirements:",
				"value": "• 77 Agility\n• Plague's End Quest completion | [Runescape Wiki](http://runescape.wikia.com/wiki/Plague%27s_End)"
				}
		],
		"footer": {
			"icon_url": "https://vignette.wikia.nocookie.net/runescape2/images/e/e9/Runescore.png",
			"text": "Runescore awarded: 10"
		}
	}
  message.channel.send('', {embed: test});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [""],
  permLevel: "Bot Owner",
  guilds: []
};

exports.help = {
  name: "test",
  category: "System",
  description: "This is a test command.",
  usage: "test"
};
