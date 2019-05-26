exports.run = async (client, message, args, level) => {

  const embed = {
  "embed": {
    "thumbnail": {
      "url": "https://runescape.wiki/images/1/10/Solak_chathead.png"
    },
    "color": 13480569,
    "footer": {
      "icon_url": "https://i.imgur.com/aPzdbY3.jpg",
      "text": "Achievement Help | All first time reaper kills are free in #reaper-request-list!"
    },
    "author": {
      "name": "Solak Reaper Kills",
      "icon_url": "https://i.imgur.com/NJmVzyZ.png"
    },
          "fields": [
      {
        "name": "Cheap Solak/PvM Leeches",
        "value": "Unfortunately, we cannot currently offer Solak leeches for Reaper kills, so we have allied with the Solak FC which sells *paid* Solak leeches at a price of 90m per leech.  \n\nYou can find their discord here: https://discord.gg/U4GRQVX"
      }
      ]
  }
};

  embed.embed.timestamp = new Date();
  message.channel.send(embed);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
  guilds: ["382696689812766720", "485523397179342848"],
  cooldown: 5000
};

exports.help = {
  name: "solak",
  category: "Information",
  description: "Sends info regarding Solak Reaper kills.",
  usage: "solak"
};
