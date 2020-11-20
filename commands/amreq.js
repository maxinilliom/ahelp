exports.run = async (client, message, args, level) => {
  if (!args[0]) return;
  const update = args.join(" ");
  client.amReq.set("0", update);
  message.channel.send(`Successfully updated requirement to: ${update}`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Admin",
  guilds: []
};

exports.help = {
  name: "amreq",
  category: "System",
  description: "F.A.O LARS DELUX.",
  usage: "? ? ?"
};
