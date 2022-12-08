// @ts-ignore
import dotenv from "dotenv";
import * as process from "process";

dotenv.config();

export const config = {
  bot: { token: process.env.BOT_TOKEN || "" },
  auth: { adminId: process.env.ADMIN_ID || "" },
};
