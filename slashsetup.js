const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const { SlashCommandBuilder } = require('discord.js');
let commands = [];

const rest = new REST({ version: '9' }).setToken("[bot token]")

const setWordle = new SlashCommandBuilder()
.setName('setwordle')
.setDescription('Changes the wordle for this server.')
.addStringOption(option =>
	option
	.setName('word')
	.setDescription('The word to set the wordle to.')
	.setRequired(true));
commands.push(setWordle.toJSON());
commands[0].default_member_permissions = "8";

const wordle = new SlashCommandBuilder()
.setName('wordle')
.setDescription('Play the wordle for this server.')
commands.push(wordle.toJSON());

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationCommands("[server ID]"),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();