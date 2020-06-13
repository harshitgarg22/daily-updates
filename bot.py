import discord
from discord.ext import commands
import json
import os
import requests
from bs4 import BeautifulSoup as BSHTML
from discord.ext.commands import CommandNotFound

with open(os.path.join("config.json")) as f:
    config = json.load(f)

bot = commands.Bot(command_prefix="!", description="daily_updates bot")


@bot.event
async def on_ready():
    print("Logged in as {0}".format(bot.user))

@bot.event
async def on_command_error(ctx, error):
    if isinstance(error, CommandNotFound):
        return
    raise error
@bot.command()
async def corona(ctx, state="delhi"):
    url = "https://www.mohfw.gov.in/"
    page = requests.get(url).text
    soup = BSHTML(page, features="html.parser")

    table_data = [[cell.text for cell in row("td")] for row in soup("tr")]
    table_data = table_data[1:]

    for row in table_data:
        try:
            if row[1].lower() == state.lower():
                embed = discord.Embed(title="Corona Update for " + row[1], description="", color=0x00ff00, url=url)
                embed.add_field(name="Active Cases", value=row[2], inline=False)
                embed.add_field(name="Cured", value=row[3], inline=False)
                embed.add_field(name="Dead", value=row[4], inline=False)
                embed.add_field(name="Total Cases", value=row[5], inline=False)
                embed.set_footer(text="Data retrieved from " + url)
                await ctx.send(embed=embed)
                break
        except:
            await ctx.send("Incorrect argument.")
            break


    

# if __name__ == "main":
bot.run(config["token"])
    # bot.logout()
