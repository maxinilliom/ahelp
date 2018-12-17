exports.run = async (client, message, args, level) => {

  const embed = {
  "embed": {
    "thumbnail": {
      "url": "https://runescape.wiki/images/1/10/Solak_chathead.png"
    },
    "color": 13480569,
    "footer": {
      "icon_url": "https://cdn.discordapp.com/attachments/297388220231057419/400471386101121024/image.jpg",
      "text": "Achievement Help | Connecting our Helpful Communities!"
    },
    "author": {
      "name": "Solak Reaper Kills",
      "icon_url": "https://i.imgur.com/NJmVzyZ.png"
    },
          "fields": [
      {
        "name": "__**Option 1**__",
        "value": "As we cannot currently offer Solak leeches for Reaper kills, we have allied with Solak FC, who has partnered with us in an attempt to help our members where we are currently unable. The load of a free service is extensive, so expect a wait time. Our team will continue to practice as time allows to help share the load when we are able. We are happy to work with our partners to mutually benefit the community and bring support to their efforts. They do have some requirements, which are listed below.\n\n__Requirements:__\n- Watched a YouTube guide or read through the Discord guide\n- Willing to join voice chat for the kill\n- Tier 90+ perked weapons\n- Tier 80+ perked armour\n- Tier 95 prayers\n- Dark Magic/Mahjarrat/Invigorate/Vampyrism Aura\n- Godbook/Scrimshaw/Erethdor’s Grimoire\n- Dominion Mines\n\nYou can join their server here: https://discord.gg/stdyvsa"
      },
      {
        "name": "__**Option 2**__",
        "value": "If you do not meet the above requirements or would prefer to not wait in line, you may utilise EasyLeech's paid service. They have been verified as trustworthy by us and many users have left feedback for their kills.\n\nTo help our members, their price for players who come from our server is discounted from 120m to 108m for a Solak leech kill. They also offer other leech services which you can read about in their server. We hope that this will help members get their Solak Reaper kill for the Completionist achievement.\n\nIf you have any questions or feedback, please feel free to share it with us! You can join their server and learn more about it here: https://discord.gg/CHhmrz3"
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
  category: "Info",
  description: "Sends info regarding Solak Reaper kills.",
  usage: "solak"
};
