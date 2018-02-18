const { inspect } = require("util");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const { data } = require("../guides/compGuides/compGuide.js");
//const { data } = require(/*COMP CAPE GUIDES FILE, DATA SHOULD CONTAIN ACHIEVEMENT OBJECTS NAMED BY <ACHIEVENAME>*/)


	/* const { something } = require("something");
		// is same as
		const something = require("something").something;

		// Arrays
		const arr = ["hi", "bye"];

		const [hi, bye] = arr;
		console.log(hi); // "hi"
		console.log(bye); // "bye" */

exports.run = async (client, message, [...achieveName], level) => { // eslint-disable-line no-unused-vars
	if (!achieveName[0]) return message.channel.send(`Please specify an achievement name.`);
	if (achieveName && !data.hasOwnProperty(achieveName.join(" "))) return message.channel.send(`${achieveName} is not a valid achievement name.`);

	const guide = data[achieveName.join(" ")];
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
	name: "comp",
	category: "Guides",
	description: "Encyclopedia of Completionist Cape guides written by The Five-O and assembled by Son.",
	usage: "comp <help/achievement name>"
};
