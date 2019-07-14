const { inspect } = require("util");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);

exports.run = (client, message, args, level) => {
		const type = args[0].toLowerCase();
		if (!["affiliate","dxpw","event","fc","misc","role"].includes(type)) return message.channel.send('Incorrect argument provided.');
		const { data } = require(`../info/${type}.js`);
		const embeds = Object.getOwnPropertyNames(data);
		const gl = client.guideList;
		const msgArr = [];

	if (!args[1]) {
		let i = 0, o = 0, x = embeds.length, errMsg = "";
		if (!gl.has(type)) gl.set(type, []);
		msgArr.push(message.channel.id);
		async function list() {
			const curr = data[embeds[o]];
			const embed = curr.description || curr.fields ? {embed: curr} : curr;
			const channelName = message.channel.name.toProperCase().replace(/-/g, " ");
			if (curr.footer && type !== "dxpw") {
				curr.footer.text = `Achievement Help | ${channelName}`;
			} else if (curr.footer) {
				curr.footer = {
					"icon_url": "https://i.imgur.com/FsU0epp.png",
					"text": "For more info on XP rates and efficiency visit Skilling! (https://discord.me/skilling)"
				}
			}

			if (curr.description || curr.footer) {
				switch (type) {
					case "affiliate": 
						curr.color = 14601387;
						break;
					case "event":
						curr.color = 2136831;
						break;
					case "fc":
						curr.color = 8924979;
						break;
					case "misc":
						curr.color = 2336356;
						break;
					case "role":
						curr.color = 5011162;
						break;
					default:
						curr.color = 16738740;
				}
			}
			try {
				await message.channel.send("", embed)
					.then(m => msgArr.push(m.id));
			} catch (err) {
				errMsg += `${o}. ${embeds[o]} failed to send with error: ${err}\n`;
				i--;
			}
			i++;
			o++;
			if (o < x) setTimeout(list, 2000);
			if (o == x) {
	  		if (gl.get(type).length > 0) {
	  			fin = `Message IDs already exist for **${type}** guides. Message IDs not saved to prevent overwriting.`;
	  		} else {
	  			gl.set(type, msgArr);
	  			fin = `All message IDs saved to **${type}**.`;
	  		}
		  	await message.reply(`**${i}**/\**${embeds.length}** responses listed.\n\n${errMsg}`)
					.then(m => m.delete(10000));
		  	await message.channel.send(fin)
		  		.then(m => m.delete(5000));
			}
		}
		list();
		return message.delete();
	}

	if (args[1].toLowerCase() == "clear") {
		if (!gl.has(type)) return message.channel.send(`No messages are currently stored for **${type}**.`);
		let cl = gl.get(type);
		const channel = cl[0];
		if (message.channel.id !== channel) return message.channel.send(`Please use this command in the <#${message.guild.channels.get(channel).id}> channel that the embeds were originally sent in.`);
		cl = cl.slice(1);
		let i = 0, o = 0, x = cl.length, errMsg = "";
		async function clear() {
			const id = cl[o];
			try {
				await message.channel.fetchMessage(id)
					.then(msg => msg.delete());
				} catch (err) {
					errMsg += `${o} failed with error: ${err}\n`;
					i--;
				};
				i++;
				o++;

			if (o < x) {
				await client.wait(1500);
				clear();
			}
			if (o == x) {
				await message.reply(`**${i}**/\**${x}** messages removed.\n\n${errMsg}`)
					.then(m => m.delete(10000));
				gl.delete(type);
				await message.channel.send(`All **${type}** guides deleted from memory.`)
					.then(m => m.delete(5000));
			}
		}
		clear();
		return message.delete();
	}
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Bot Admin",
  guilds: ["382696689812766720", "485523397179342848"]
};

exports.help = {
  name: "info",
  category: "System",
  description: "Posts server info to the channel.",
  usage: "info <type>"
};
