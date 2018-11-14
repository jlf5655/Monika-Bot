const Discord = require('discord.js');
const Enmap = require('enmap');
const fs = require('fs');
const client = new Discord.Client();
const config = require('./config.json');

client.config = config; // make visible everywhere
client.perm = require('./permissions.js'); // permissions.js is important

const start = async() =>{
	// first event loop
	await fs.readdir('./events/', (err, files) =>{
		if (err){
			return console.error(err);
		}
		files.forEach(file =>{
			if(!file.endsWith('.js')) return; // ignore non js files
			const event = require(`./events/${file}`); // fancy way to load file
			const eventName = file.split('.')[0]; // get the name, without file extension
			client.on(eventName, event.bind(null, client));
		});
	});	
	// second command loop
	client.commands = new Enmap;
	client.aliases = new Enmap;
	await fs.readdir('./commands/', (err, files) =>{
		if(err){
			return console.error(err);
		}
		files.forEach(file =>{
			if(!file.endsWith('.js')) return;
			const cmd = require(`./commands/${file}`);
			console.log(`Trying command ${cmd.help.name}`);
			client.commands.set(cmd.help.name, cmd);
			cmd.conf.aliases.forEach(alias => {
				client.aliases.set(alias, cmd.help.name);
			});
		});
	});

	client.levelCache = {};
	for (let i=0;i< client.perm.permLevels.length;i++){ //hard-code for now, should be client.perm.permLevels.length
		const thisLevel = client.perm.permLevels[i];
		client.levelCache[thisLevel.name] = thisLevel.level;
	}

	client.login(config.token);
}

start();