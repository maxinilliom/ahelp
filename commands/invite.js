exports.run = async (client, message, args, level) => {

  const e = {
    "embed": {
      "title": "AHelp Invite",
      "description": "[Invite AHelp to your server using this link](https://discordapp.com/oauth2/authorize/?permissions=388160&scope=bot&client_id=408471193675497473).",
      "color": 12500670
    }
  };
  message.channel.send(e);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["inv"],
  permLevel: "User",
  guilds: [],
  cooldown: 5000
};

exports.help = {
  name: "invite",
  category: "Information",
  description: "Fetch an invite for the bot.",
  usage: "invite"
};
