exports.run = (client, message, args, level) => {

const friendly = client.config.permLevels.find(l => l.level === level);
message.reply(`Your permission level is: ${level}`);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
  guilds: []
};

exports.help = {
  name: "test",
  category: "System",
  description: "This is a test command.",
  usage: "test"
};
