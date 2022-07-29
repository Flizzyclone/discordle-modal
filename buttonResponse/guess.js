const Discord = require("discord.js");

module.exports = {
	name: 'guess',
	async respond(interaction) {
        let tryOn = interaction.customId.replace("guess_","");
        let word = tryOn.substring(0,tryOn.indexOf('_'));
        tryOn = tryOn.replace(`${word}_`,"");
        tryOn = tryOn.replaceAll('_',' ');
    
        const modal = new Discord.ModalBuilder()
        .setCustomId(interaction.customId)
        .setTitle(`Guess the Wordle! (${word.length} letters)`);

        const guessInput = new Discord.TextInputBuilder()
        .setCustomId(`guess_${word}_guess`)
        .setLabel("What is your guess?")
        .setStyle(Discord.TextInputStyle.Short)
        .setMinLength(word.length)
        .setMaxLength(word.length);

        modal.addComponents([new Discord.ActionRowBuilder().addComponents([guessInput])]);

        await interaction.showModal(modal);
    },
}