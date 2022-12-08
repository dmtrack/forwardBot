import { Context, Telegraf } from "telegraf";
import dotenv from "dotenv";
import { config } from "./config";
import { textParser } from "../forwardBot/utils/textParser";
import { UpdateType } from "telegraf/typings/telegram-types";
import * as process from "process";

const token = config.bot.token;
const bot: Telegraf<Context<UpdateType>> = new Telegraf(
  process.env.BOT_TOKEN as string
);

dotenv.config();

bot.command("start", async (ctx) => {
  try {
    await ctx.replyWithHTML(`hello, ${ctx.from.first_name}`);
  } catch (e) {
    console.error("start error", e);
  }
});

bot.on("text", async (ctx) => {
  try {
    if (ctx.from.id !== config.auth.adminId) {
      await ctx.forwardMessage(config.auth.adminId, `${ctx.message.text}`);
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
