module.exports = (client, guild)=> {
	client.logger.cmd(`[GUILD LEAVE] ${guild.name} (${guild.id}) removed the bot.`);
	// guild override deletion here
};