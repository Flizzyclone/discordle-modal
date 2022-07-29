const Discord = require("discord.js");
const client = new Discord.Client({ intents: []});
const fs = require('fs');
const slashCommandFiles = fs.readdirSync('./slashCommands').filter(file => file.endsWith('.js'));
const messageInteractionFiles = fs.readdirSync('./buttonResponse').filter(file => file.endsWith('.js'));
const modalInteractionFiles = fs.readdirSync('./modalResponse').filter(file => file.endsWith('.js'));
const DBFunction = require('./database');

client.slashCommands = new Discord.Collection();

for (const file of slashCommandFiles) {
  const command = require(`./slashCommands/${file}`);
  
	client.slashCommands.set(command.name, command);
}

client.messageInteractions = new Discord.Collection();

for (const file of messageInteractionFiles) {
  const command = require(`./buttonResponse/${file}`);
  
	client.messageInteractions.set(command.name, command);
}

client.modalInteractions = new Discord.Collection();

for (const file of modalInteractionFiles) {
  const command = require(`./modalResponse/${file}`);
  
	client.modalInteractions.set(command.name, command);
}

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("guildDelete", guild => {
  DBFunction.deleteGuildEntry(guild.id);
})

client.on('interactionCreate', interaction => {
	if (interaction.type == 2) { //Slash Command

    if (!client.slashCommands.has(interaction.commandName)) return;

    client.slashCommands.get(interaction.commandName).respond(interaction);

  } else if (interaction.type == 3) { //Message Component
    //selects up to first underscore
    let command = interaction.customId.substring(0,interaction.customId.indexOf('_'));
    client.messageInteractions.get(command).respond(interaction);
  } else if (interaction.type == 5) { //Modal
    //selects up to first underscore
    let command = interaction.customId.substring(0,interaction.customId.indexOf('_'));
    client.modalInteractions.get(command).respond(interaction);
  }
});

client.login("[bot token]";