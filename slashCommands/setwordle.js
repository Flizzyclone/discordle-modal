const DBFunction = require('../database');

module.exports = {
	name: 'setwordle',
	async respond(interaction) {
        await interaction.deferReply({ ephemeral: true });
        let word = interaction.options.get('word').value;
        if (word.length > 1 && word.length < 11) {
            let successful = await DBFunction.setWord(interaction.guildId, word);
            if (successful) {
                interaction.editReply({content: `Wordle successfully set to "${word}".`, ephemeral: true});
            } else {
                interaction.editReply({content: `Error setting wordle, please try again.`, ephemeral: true});
            }
        } else {
            interaction.editReply({content: `Please use a word between 2 and 10 characters.`, ephemeral: true});
        }
    },
}