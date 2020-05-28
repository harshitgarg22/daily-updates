const Discord = require("discord.js");
const auth = require("./auth.json");
const data = require("./data.json");
const client = new Discord.Client();
let moment = require("moment");

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
        message.channel.send(
          `Current time is: ${message.createdAt}`
        );
        break;
      case "ps":
        let timeMessage = message.createdTimestamp;
        let duration = ps.endTimestamp - ps.startTimestamp;

        let elapsed = timeMessage - ps.startTimestamp;
        let elapsedCost = (ps.cost * elapsed) / duration;
        
        message.channel.send("You have wisely spent your \u20B9" + elapsedCost.toFixed(2) + " by now.");
        break;
    }
  }
});

client.login(auth.token);
