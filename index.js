const { Telegraf } = require("telegraf");
require("dotenv").config();
const adminId = require("./config.js");
const textParser = require("./utils/textParser");

const token = process.env.BOT_TOKEN;
const bot = new Telegraf(token);

bot.command("start", async (ctx) => {
  try {
    await ctx.replyWithHTML(`hello, ${ctx.from.first_name}`);
  } catch (e) {
    console.error("start error", e);
  }
});

bot.on("text", async (ctx) => {
  try {
    if (ctx.from.id !== adminId) {
      await ctx.forwardMessage(adminId, `${ctx.message.text}`);
    } else {
      const id = await textParser(ctx.message.text).id;
      const message = await textParser(ctx.message.text).message;
      await bot.telegram.sendMessage(id, message);
    }
  } catch (e) {
    console.error("ontext error", e);
  }
});

bot.launch().then(() => console.log("bot launched"));
