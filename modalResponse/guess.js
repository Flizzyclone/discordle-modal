const Discord = require("discord.js");
const emojis = require("../emotes.json");

module.exports = {
	name: 'guess',
	async respond(interaction) { //Called when guess modal submitted
        //Parse out the correct word and number of tries left from the interaction customId
        let tries = interaction.customId.replace("guess_","");
        let word = tries.substring(0,tries.indexOf('_'));
        tries = Number(tries.replace(`${word}_`,""))

        const submission = interaction.fields.getTextInputValue(interaction.components[0].components[0].customId);
        if (submission == word) { //Guess was correct
            let msgContent = interaction.message.content;
            msgContent = msgContent.replace(`- ${tries}/6 tries remaining`,`- ${tries-1}/6 tries remaining`)

            let wordLetters = word.split("");
            for (i=0; i < wordLetters.length; i++) { //Loop through each letter of the word, replace the next line of black squares with the blue version of the same letter (success!)
                if (i+1 < wordLetters.length) {
                    msgContent = msgContent.replace("⬛",emojis.blue[wordLetters[i]] + "​");
                } else { //Last letter
                    msgContent = msgContent.replace("⬛",emojis.blue[wordLetters[i]] + "​" + " 🥳");
                }
            }

            let components = new Discord.ActionRowBuilder() //Removes all components previously attached to the message
            .addComponents([
                new Discord.ButtonBuilder()
                .setEmoji("📣")
                .setStyle("Primary")
                .setLabel("Share in Channel")
                .setCustomId(`share_${word}_${7-tries}`) //Add information to the guess button containing the correct word the number of guesses it took the player to guess the word (guesses = opposite of tries left)
            ]);
            interaction.update({content: msgContent, components:[components]}); //Final response with updated message content and 'Share in Channel' button
        } else { //Guess was incorrect
            if (tries == 1) { //Player is out of tries
                let msgContent = interaction.message.content;
                msgContent = msgContent.replace(`- ${tries}/6 tries remaining`,`- ${tries-1}/6 tries remaining`)
                //Remove the color code information in order for replacing of black squares to work.
                msgContent = msgContent.replace("\n\n🟦 = Letter in word in correct spot.\n🟧 = Letter in word in a different spot.\n⬛ = Letter not in word.","");

                let wordLetters = word.split("");
                let submissionLetters = submission.split("");
                for (i=0; i < wordLetters.length; i++) { //Loop through each letter of the word, replace the next line of black squares with the blue, orange, or black version of the same letter
                    if (submissionLetters[i] == wordLetters[i]) {
                        msgContent = msgContent.replace("⬛",emojis.blue[submissionLetters[i]] + "​");
                    } else if (wordLetters.indexOf(submissionLetters[i]) != -1) {
                        msgContent = msgContent.replace("⬛",emojis.orange[submissionLetters[i]] + "​");
                    } else {
                        msgContent = msgContent.replace("⬛",emojis.black[submissionLetters[i]] + "​");
                    }
                }
                msgContent += `\n\nThe wordle was ${word}. Better luck next time!`;

                //Readdition of color code information.
                msgContent+="\n\n🟦 = Letter in word in correct spot.\n🟧 = Letter in word in a different spot.\n⬛ = Letter not in word.";
                let components = new Discord.ActionRowBuilder() //Removes all components previously attached to the message
                .addComponents([
                    new Discord.ButtonBuilder()
                    .setEmoji("📣")
                    .setStyle("Primary")
                    .setLabel("Share in Channel")
                    .setCustomId(`share_${word}_X`) //Add information to the guess button containing the correct word and that the player has failed to guess the word
                ]);
                interaction.update({content: msgContent, components:[components]}); //Final response with updated message content and 'Share in Channel' button
            } else { //Player still has tries left
                let msgContent = interaction.message.content;
                msgContent = msgContent.replace(`- ${tries}/6 tries remaining`,`- ${tries-1}/6 tries remaining`)
                //Remove the color code information in order for replacing of black squares to work.
                msgContent = msgContent.replace("\n\n🟦 = Letter in word in correct spot.\n🟧 = Letter in word in a different spot.\n⬛ = Letter not in word.","");

                let wordLetters = word.split("");
                let submissionLetters = submission.split("");
                for (i=0; i < wordLetters.length; i++) {
                    if (submissionLetters[i] == wordLetters[i]) { //Loop through each letter of the word, replace the next line of black squares with the blue, orange, or black version of the same letter
                        msgContent = msgContent.replace("⬛",emojis.blue[submissionLetters[i]] + "​");
                    } else if (wordLetters.indexOf(submissionLetters[i]) != -1) {
                        msgContent = msgContent.replace("⬛",emojis.orange[submissionLetters[i]] + "​");
                    } else {
                        msgContent = msgContent.replace("⬛",emojis.black[submissionLetters[i]] + "​");
                    }
                }
                //Add a new line of black squares to be replaced on next guess
                msgContent += "\n​";
                for (i=0; i < wordLetters.length; i++) {
                    msgContent += "⬛"
                }
                //Readdition of color code information.
                msgContent+="\n\n🟦 = Letter in word in correct spot.\n🟧 = Letter in word in a different spot.\n⬛ = Letter not in word.";
                let components = new Discord.ActionRowBuilder() //Removes all components previously attached to the message
                .addComponents([
                    new Discord.ButtonBuilder()
                    .setEmoji("❓")
                    .setStyle("Primary")
                    .setLabel("Make a guess")
                    .setCustomId(`guess_${word}_${tries-1}`) //Add information to the guess button containing the correct word and how many tries player has left
                ])
                interaction.update({content: msgContent, components:[components]}); //Final response with updated message content and updated 'Guess' button
            }
        }
    }
}