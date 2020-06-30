import discord
from discord.ext import commands
import json
import os


with open(os.path.join("config.json")) as f:
    config = json.load(f)

bot = commands.Bot(command_prefix="!", description="daily_updates bot")


@bot.event
async def on_ready():
    print("Logged in as {0}".format(bot.user))
    channel = bot.get_channel(config["teeten"]["channelid"]["60k-or-50k"])
    await channel.send("Reminder: Diary for week-5 should be filled by tonight.")

bot.run(config["token"])
bot.logout()
