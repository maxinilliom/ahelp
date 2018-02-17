const { inspect } = require("util");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);

	/* const { something } = require("something");
		// is same as
		const something = require("something").something;

		// Arrays
		const arr = ["hi", "bye"];

		const [hi, bye] = arr;
		console.log(hi); // "hi"
		console.log(bye); // "bye" */

exports.run = async (client, message, [skill, ...args], level) => { // eslint-disable-line no-unused-vars
	if (!skill) return message.channel.send(`Please specify a skill name.`);
	if (skill && !client.maxGuides.includes(skill.toLowerCase())) return message.channel.send(`${skill.toProperCase()} is not a valid skill name.`);
	if (!args[0]) return message.channel.send(`Please specify options to search the Max Cape guides with.`);
	const { data } = require(`../maxGuides/${skill}.js`);

	const guide = data["1 - 30"];
	message.channel.send("", {embed: guide});
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: "Administrator",
	guilds: []
};

exports.help = {
	name: "max",
	category: "Guides",
	description: "Encyclopedia of Max Cape guides written by The Five-O and assembled by Son.",
	usage: "max <help/skill> <level/name/help>"
};