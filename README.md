# discordle-modal
discordle-modal is a Discord version of [wordle](https://www.nytimes.com/games/wordle/index.html) made in Discord.JS v14. It is completely interaction based and was developed over the course of a couple hours as a experiment in interactions ussing Discord.JS. Wordle's are configured per server and stored in a SQLite Database. Max length for wordle's is 10 characters. The bot cannot handle spaces.
## Setup
1. Clone the git repository anywhere of your choosing.
2. [Create a Discord bot](https://discordpy.readthedocs.io/en/stable/discord.html) and copy the token.
3. Paste that token where it says [bot token] in index.js and slashsetup.js.
4. Add the Discord bot to the server of your choosing.
5. Enter your server ID where it says [server ID] in slashsetup.js.
6. Run slashsetup.js to set up the commands and then run index.js to get the bot running.
## Usage
### To set a new word:
Use /setwordle and have the word argument be your new word. Default is 'blank'.
### To play: 
Just use /wordle!
