const DBFunction = require('../database');

module.exports = {
	name: 'setwordle',
	async respond(interaction) { //Called when user runs /setwordle command as defined by name prop
        await interaction.deferReply({ ephemeral: true }); //Sets the message to be only viewable by the command user
        let word = interaction.options.get('word').value;
        if (word.length > 1 && word.length < 11) { //Word argument is between 2 and 10 characters
            let successful = await DBFunction.setWord(interaction.guildId, word);
            if (successful) {
                interaction.editReply({content: `Wordle successfully set to "${word}".`, ephemeral: true});
            } else {
                interaction.editReply({content: `Error setting wordle, please try again.`, ephemeral: true});
            }
        } else { //Word argument is less than 1 character or greater than 10
            interaction.editReply({content: `Please use a word between 2 and 10 characters.`, ephemeral: true});
        }
    },
}