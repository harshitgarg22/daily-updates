const Discord = require("discord.js");
const auth = require("./auth.json");
const client = new Discord.Client();

const data = require("./data.json");
let quotes = require("./quotes.json");
quotes = quotes.quotes;

const commandPrefix = "!";
const ps = data.ps;

client.once("ready", () => {
  console.log("Ready to serve the master.");
});

client.on("message", (message) => {
  if (message.content.substring(0, 1) == commandPrefix) {
    args = message.content.substring(1).split(" ");
    command = args[0];
    args.splice(1);
    command = command.toLowerCase();

    switch (command) {
      case "ping":
        message.channel.send("pong");
        break;
      case "intro":
        message.channel.send(
          "Hullo everyone! I'm a daily-updates bot to remind you of your misery."
        );
        break;
      case "time":
        message.channel.send(`Current time is: ${message.createdAt}`);
        break;
      case "ps":
        let timeMessage = message.createdTimestamp;
        let duration = ps.endTimestamp - ps.startTimestamp;

        let elapsed = timeMessage - ps.startTimestamp;
        let elapsedCost = (ps.cost * elapsed) / duration;

        message.channel.send(
          "\u20B9" + elapsedCost.toFixed(2) + " down the drain."
        );
        break;
      case "killme":
        let num = Math.floor(Math.random() * quotes.length);
        let quote = quotes[num].quote;
        let author = quotes[num].author;

        const quoteEmbed = new Discord.MessageEmbed()
          .setColor("#0099ff")
          .setTitle(quote)
          .setDescription(author);

        message.channel.send(quoteEmbed);
        break;
      case "help":
        message.channel.send("God helps those who help themselves.");
    }
  }
});

client.login(auth.token);
