exports.run = async (client, message, args, level) => {

  const table = require("markdown-table");
  const data = args.join(" ").split("\n").map(r => r.trim.split(","));
  if (!args[0]) return message.channel.send("ERROR");

  message.channel.send(table(data), {code: true});

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner",
  guilds: []
};

exports.help = {
  name: "table",
  category: "Information",
  description: "Create a table to display information.",
  usage: "table <header1, header2>\n <a1, a2>\n <b1, b2>"
};
