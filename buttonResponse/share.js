const Discord = require("discord.js");
const emojis = require('../emotes.json');

module.exports = {
	name: 'share',
	async respond(interaction) { //Called when the user presses the 'Share in Channel' button at the end of a game
        //Parse out the correct word and number of tries it took the player to guess the correct word
        await interaction.deferReply();
        let tries = interaction.customId.replace("share_","");
        let word = tries.substring(0,tries.indexOf('_'));
        tries = tries.replace(`${word}_`,"");

        //Constructs the public-facing message
        let newContent = interaction.message.content;
        newContent = newContent.replace("Wordle",`<@${interaction.user.id}>'s Wordle`);
        if (tries == 'X') { //If player did not guess the correct word
            newContent = newContent.replace(`0/6 tries remaining`,`X/6 tries`);
            newContent = newContent.replace(`\n\nThe wordle was ${word}. Better luck next time!`,"");
        } else { //If player did guess the correct word
            newContent = newContent.replace(`${6-tries}/6 tries remaining`,`${tries}/6 tries`);
        }

        let newContentArr = newContent.split("​");
        for(i=0; i < newContentArr.length; i++) { //Replaces all squares with letters in them with blank squares
            if (emojis.arrays.orange.indexOf(newContentArr[i]) != -1) {
                newContent = newContent.replace(newContentArr[i], "🟧");
            } else if (emojis.arrays.blue.indexOf(newContentArr[i]) != -1) {
                newContent = newContent.replace(newContentArr[i], "🟦");
            } else if (emojis.arrays.black.indexOf(newContentArr[i]) != -1) {
                newContent = newContent.replace(newContentArr[i], "⬛");
            }
        }

        interaction.followUp({content: newContent, components: []}); //Creates a new non-ephemeral message and posts it in the same channel the player played the wordle game in
    },
}