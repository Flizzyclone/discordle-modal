const Discord = require("discord.js");

module.exports = {
	name: 'guess',
	async respond(interaction) { //Called when the user presses the 'Guess' button on an in progress game
        //Parse out the correct word and number of tries left from the interaction customId
        let tryOn = interaction.customId.replace("guess_","");
        let word = tryOn.substring(0,tryOn.indexOf('_'));
        tryOn = tryOn.replace(`${word}_`,"");
        tryOn = tryOn.replaceAll('_',' ');
    
        const modal = new Discord.ModalBuilder()
        .setCustomId(interaction.customId) //customId for modal follows the format "guess_[the correct word]_[the number of tries the player has left]"
        .setTitle(`Guess the Wordle! (${word.length} letters)`);

        const guessInput = new Discord.TextInputBuilder()
        .setCustomId(`guess_${word}_guess`) //Adds the correct word to the customId of the text input so that the modal response code can parse out the correct word
        .setLabel("What is your guess?")
        .setStyle(Discord.TextInputStyle.Short)
        .setMinLength(word.length) //Makes sure the player cannot type in a guess word greater or less than length of the correct word
        .setMaxLength(word.length);

        modal.addComponents([new Discord.ActionRowBuilder().addComponents([guessInput])]);

        await interaction.showModal(modal); //Pops up modal on player's screen
    },
}