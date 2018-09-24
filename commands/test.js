exports.run = async (client, message, args, level) => {

	const content = message.content.substring(6);
	const guild = message.guild;
	const [type, time, date, ...details] = content.split("  ");
	const [world, fc, voice] = details ? details : undefined;
	const vc = voice ? guild.channels.find('name', voice) : undefined;
	const inv = await vc.createInvite({maxAge: 3600}, `${type.toProperCase()} event.`);

	message.channel.send(`${type.toProperCase()} at ${time} on ${date} in ${guild.name} on world ${world} in ${fc} FC using ${vc.name} for voice.`);
	message.channel.send(`Join voice here: ${inv}`);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner",
  guilds: []
};

exports.help = {
  name: "test",
  category: "System",
  description: "This is a test command.",
  usage: "test"
};
