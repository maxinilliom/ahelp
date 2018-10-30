exports.run = async (client, message, args, level) => {

  const embed = "Website GUI Version:\nhttps://truetrimmed.com/achievement-tracker\n\nExcel Sheet:\nhttps://docs.google.com/spreadsheets/d/19sVmY1BgnRkuLIJANjf42IEvh83u_mYqf6PY0E5KXuk/edit?usp=sharing\nYou will need to select File > Make a copy.. in order to edit the sheet to your own achievement completion status.\n\nContact Frosty#2740 with any questions or concerns!"
  message.channel.send(embed);


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner",
  guilds: []
};

exports.help = {
  name: "tracker",
  category: "Info",
  description: "Explanation of the upcoming Achievement Tracker from Mr Frosty.",
  usage: "tracker"
};
