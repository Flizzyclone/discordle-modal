const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const { SlashCommandBuilder } = require('discord.js');
let commands = [];

const rest = new REST({ version: '9' }).setToken("[bot token]")

//Command to set world for a server, requires a string argument and to be limited to people with 'Administrator' permission.
const setWordle = new SlashCommandBuilder()
.setName('setwordle')
.setDescription('Changes the wordle for this server.')
.addStringOption(option =>
	option
	.setName('word')
	.setDescription('The word to set the wordle to.')
	.setRequired(true));
commands.push(setWordle.toJSON());
commands[0].default_member_permissions = "8"; //Limit to people with 'Administrator' permission.

//Main wordle command, requires no arguments.
const wordle = new SlashCommandBuilder()
.setName('wordle')
.setDescription('Play the wordle for this server.')
commands.push(wordle.toJSON());

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationCommands("[bot token]"),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();