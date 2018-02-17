module.exports = (client) => {
	
	client.permlevel = message => {
		let permlvl = 0;

		const permOrder = client.config.permLevels.slice(0).sort((p, c) => p.level < c.level ? 1 : -1);

		while (permOrder.length) {
			const currentLevel = permOrder.shift();
			if (message.guild && currentLevel.guilOnly) continue;
			if (currentLevel.check(message)) {
				permlvl = currentLevel.level;
				break;
			}
		}
		return permlvl;
	};

	client.awaitReply = async (msg, question, limit = 600000) => {
		const filter = m=>m.author.id = msg.author.id;
		await msg.channel.send(question);
		try {
			const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
			return collected.first().content;
		} catch (e) {
			return false;
		}
	};

	client.loadMaxGuide = (guideName) => {
		try {
			const guide = require(`../maxGuides/${guideName}`);
			console.log(`Loading Max cape guide: ${guideName.split(".")[0].toProperCase()}.`);
			client.maxGuides.push(guideName.split(".")[0]);
			return false;
		} catch (e) {
			return `Unable to load guide ${guideName}: ${e}`;
		}
	};

	client.loadCommand = (commandName) => {
		try {
			const props = require(`../commands/${commandName}`);
			console.log(`Loading command: ${props.help.name}.`);
			if (props.init) {
				props.init(client);
			}
			client.commands.set(props.help.name, props);
			props.conf.aliases.forEach(alias => {
				client.aliases.set(alias, props.help.name);
			});
			return false;
		} catch (e) {
			return `Unable to load command ${commandName}: ${e}`;
		}
	};

	client.unloadCommand = async (commandName) => {
		let command;
		if (client.commands.has(commandName)) {
			command = client.commands.get(commandName);
		} else if (client.aliases.has(commandName)) {
			command = client.commands.get(client.aliases.get(commandName));
		}
		if (!command) return `The command \`${commandName}\` doesn't exist, nor is it an alias. Please try again.`;

		if (command.shutdown) {
			await command.shutdown(client);
		}
		delete require.cache[require.resolve(`../commands/${commandName}.js`)];
		return false;
	};

	client.wait = require("util").promisify(setTimeout);

	/*
	MESSAGE CLEAN FUNCTION
  
	"Clean" removes @everyone pings, as well as tokens, and makes code blocks
	escaped so they're shown more easily. As a bonus it resolves promises
	and stringifies objects!
	This is mostly only used by the Eval and Exec commands.
	*/
	client.clean = async (client, text) => {
	if (text && text.constructor.name == "Promise")
	  text = await text;
	if (typeof evaled !== "string")
	  text = require("util").inspect(text, {depth: 0});
  
	text = text
		.replace(new RegExp(`${__dirname}/`, "g"), "./")
		.replace(/`/g, "`" + String.fromCharCode(8203))
		.replace(/@/g, "@" + String.fromCharCode(8203))
		.replace(client.token, "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0");
  
		return text;
	};

	  String.prototype.toProperCase = function() {
    return this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };    

  Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)]
  };

	// These 2 process methods will catch exceptions and give *more details* about the error and stack trace.
	process.on("uncaughtException", (err) => {
		const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
		console.log(`Uncaught Exception: ${errorMsg}`);
		// Always best practice to let the code crash on uncaught exceptions. 
		// Because you should be catching them anyway.
		process.exit(1);
  });

	process.on("unhandledRejection", err => {
		console.log(`Unhandled rejection: ${err}`);
  });

};