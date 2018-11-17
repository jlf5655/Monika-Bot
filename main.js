const Discord = require('discord.js');
const Enmap = require('enmap');
const fs = require('fs');
const client = new Discord.Client();
const config = require('./config.json');

client.config = config; // make visible everywhere
client.perm = require('./permissions.js'); // permissions.js is important
// helper functions and the like come from functions.js
require('./functions.js')(client);

const start = async () =>{
	// start by logging in like the last version
	client.login(config.token);
	// first event loop
	fs.readdir('./events/', (err, files) =>{
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
	fs.readdir('./commands/', (err, files) =>{
		if(err){
			return console.error(err);
		}
		files.forEach(file =>{
			if(!file.endsWith('.js')) return;
			const cmd = require(`./commands/${file}`);
			console.log(`Loading command ${cmd.help.name} to cache`);
			client.commands.set(cmd.help.name, cmd);
			cmd.conf.aliases.forEach(alias => {
				client.aliases.set(alias, cmd.help.name);
			});
		});
	});

	client.levelCache = {};
	for (let i=0;i< client.perm.permLevels.length;i++){ 
		const thisLevel = client.perm.permLevels[i];
		client.levelCache[thisLevel.name] = thisLevel.level;
	}
};

start();