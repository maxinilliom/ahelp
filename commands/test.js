exports.run = (client, message, args, level) => {
  const test = {
    "title": "Levels 1 - 30: Troll Brutes",
    "author": {
      "name": "Max Cape info: Melee",
      "icon_url": "https://i.imgur.com/6c6q2iC.png"
    },
    "description": "Levels 1-30 should take approximately one hour per skill and can be done on [**Troll Brutes**](http://runescape.wikia.com/wiki/Troll_brute).",
    "thumbnail": {
      "url": "https://vignette.wikia.nocookie.net/runescape2/images/f/f0/Troll_brute.png"
    },
    "fields": [
      {
        "name": "Info:",
        "value": "Troll Brutes are found in the northernmost cave in Burthorpe. They regularly drop food which you can eat for sustenance. Although they are weak to air spells they only have 50 hitpoints so can be killed in one hit."
      },
      {
        "name": "Stats:",
        "value": "• Level 2\n• 50 Hitpoints\n• 40 EXP per kill (10 Constitution EXP included)\n• Weak to air spells"
      },
      {
        "name": "Guide:",
        "value": "[1-99 P2P/F2P Melee Guide 2017 - Fastest Experience Rates and How to Get 138 Combat Fast](https://levelskip.com/mmorpgs/RuneScape-3-1-99-Melee-Guide)"
      }
    ],
    "footer": {
      "icon_url": "https://cdn.discordapp.com/attachments/297388220231057419/400471386101121024/image.jpg",
      "text": "Achievement Help | Helping you reach your goals, whatever they may be!"
    }
  };
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