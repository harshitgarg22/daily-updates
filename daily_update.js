const Discord = require("discord.js");
const auth = require("./auth.json");
const client = new Discord.Client();

const data = require("./data.json");
const ps = data.ps;

client.login(auth.token).then(() => {
    let guild = client.guilds.get(auth.teeten.guildid);
    let channel = guild.channels.get(auth.teeten.channelid["60k-or-50k"]);
    if(guild && channel){
        channel.send("Gentle reminder folks.");
        let timeMessage = getTime();
        let duration = ps.endTimestamp - ps.startTimestamp;

        let elapsed = timeMessage - ps.startTimestamp;
        let elapsedCost = (ps.cost * elapsed) / duration;

        channel.send(
          "\u20B9" + elapsedCost.toFixed(2) + " are begone."
        )
        .then(() => client.destroy());
    }
    else{
        console.log("Could not connect to channel");
    }
    client.destroy();
});
