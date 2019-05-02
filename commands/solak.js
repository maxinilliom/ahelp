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
        "name": "__**Solak FC**__",
        "value": "As we cannot currently offer Solak leeches for Reaper kills, we have allied with Solak FC in an attempt to help our members where we are currently unable. The load of a free service is extensive, so expect a wait time. Our team will continue to practice as time allows to help share the load when we are able. We are happy to work with our partners to mutually benefit the community and bring support to their efforts. They do have some requirements, which are listed below.\n\n__Requirements:__\n- Watched a YouTube guide or read through the Discord guide\n- Willing to join voice chat for the kill\n- Tier 90+ perked weapons\n- Tier 80+ perked armour\n- Tier 95 prayers\n- Dark Magic/Mahjarrat/Invigorate/Vampyrism Aura\n- Godbook/Scrimshaw/Erethdor’s Grimoire\n- Dominion Mines\n\nYou can join their server here: https://discord.gg/stdyvsa"
      },
      {
        "name": "Cheap Solak/PvM Leeches",
        "value": "The Solak FC Admin team have created another server to sell *paid* Solak leeches at a price of 90m per leech. This is intended for those that do not want to wait on their free leech list. This service operates mostly during EU hours.\n\nYou can find their discord here: https://discord.gg/U4GRQVX"
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
  guilds: [],
  cooldown: 5000
};

exports.help = {
  name: "solak",
  category: "Information",
  description: "Sends info regarding Solak Reaper kills.",
  usage: "solak"
};
