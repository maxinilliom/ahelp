const Discord = require("discord.js");
const client = new Discord.Client({fetchAllMembers: true});
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const EnmapLevel = require("enmap-level");

client.config = require("./config.js");
require("./modules/functions.js")(client);

client.commands = new Enmap();
client.aliases = new Enmap();
client.settings = new Enmap({provider: new EnmapLevel({name: "settings"})});
client.maxGuides = [];
client.newUsers = new Discord.Collection();
client.welcomeTimer = {};
client.msgColl = {};
client.fiveLast;
client.five = 0;
client.fiveCD = 66;

const init = async () => {

	const cmdFiles = await readdir("./commands/");
	console.log(`Loading a total of ${cmdFiles.length} commands.`);
	cmdFiles.forEach(f => {
		if (!f.endsWith(".js")) return;
		const response = client.loadCommand(f);
		if (response) console.log(response);
	});

	const evtFiles = await readdir("./events/");
	console.log(`Loading a total of ${evtFiles.length} events.`);
	evtFiles.forEach(file => {
		const eventName = file.split(".")[0];
		const event = require(`./events/${file}`);
		client.on(eventName, event.bind(null, client));
		delete require.cache[require.resolve(`./events/${file}`)];
	});

	const maxGuides = await readdir("./guides/maxGuides/");
	console.log(`Loading a total of ${maxGuides.length} Max cape guides.`);
	maxGuides.forEach(f => {
		if (!f.endsWith(".js")) return;
		const response = client.loadMaxGuide(f);
		if (response) console.log(response);
	});

	client.levelCache = {};
	for (let i = 0; i < client.config.permLevels.length; i++) {
		const thisLevel = client.config.permLevels[i];
		client.levelCache[thisLevel.name] = thisLevel.level;
	}

	client.login(client.config.token);

};

init();
