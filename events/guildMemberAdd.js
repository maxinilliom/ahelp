module.exports = (client, member) => {
	const settings = client.settings.get(member.guild.id);
	const chan = client.channels.get('407919969712603145');
	chan.send(`Welcome in ${member.toString()}\n\nIf you have any of the following, let us know and we can assign a role to signify:\n• Max | Comp | MQC | Comp (t) Cape\n• Insane Final Boss or Master of All titles\n• 1,699 achievements or 18,156 RuneScore\n• Max Total Virtual Level or Max Experience\n• A HCIM or IM Account you actively play on\n• You are a RS Twitch streamer or YouTuber with more than 50 followers\n\nWe also have a friend chat in game: 'Saint Cannon'\n\nThanks for joining us (:\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`);
}
