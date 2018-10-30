exports.run = async (client, message, args, level) => {

  const embed = {
    "embed": {
      "title": "Using Chrome To Directly Search In RS Wiki",
      "description":"1. Go to Chrome Settings\n2. Under **Search Engine**, click **Manage Search Engines**\n3. Under **Other Search Engines**. click **Add**\n4. Name the **Search Engine** whatever you like (this is not that important)\n5. Name **Keyword** what ever you'd like (this affects what you need to type to redirect you to wiki)\n6. For **URL** enter the following: `https://runescape.wiki/w/Special:Search?search=%s`\n(can copy/paste this)\n7. Finish by clicking **Add**",
      "thumbnail": {
        "url": "https://i.imgur.com/C0wJPzz.png"
      },
      "footer": {
        "icon_url": "https://cdn.discordapp.com/attachments/297388220231057419/400471386101121024/image.jpg",
        "text": "Achievement Help | Connecting our Helpful Communities!"
      },
      "author": {
        "name": "Info",
        "icon_url": "https://i.imgur.com/6c6q2iC.png"
      },
            "fields": [
        {
          "name": "Using The New Search",
          "value": "On the Chrome search bar you'll now be able to search directly into the new Wiki. Start by typing your keyword (you'll notice your search bar redirect you to the RS Wiki after hitting space) followed by what you want to search in the Wiki."
        }
        ]
    }
  };

  message.channel.send(embed);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["rsw", "rswiki"],
  permLevel: "User",
  guilds: []
};

exports.help = {
  name: "wiki",
  category: "Info",
  description: "Instructions on searching the new RS Wiki.",
  usage: "wiki"
};
