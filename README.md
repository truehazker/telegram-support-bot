<h1 align="center">Welcome to Telegram Support Bot 👋</h1>


[![Bot API Version](https://img.shields.io/badge/Bot%20API-v6.6-f36caf.svg?style=for-the-badge)](https://core.telegram.org/bots/api)
[![NPM Version](https://img.shields.io/npm/v/grammy.svg?style=for-the-badge)](https://www.npmjs.com/)
[![node](https://img.shields.io/node/v/grammy.svg?style=for-the-badge)](https://www.npmjs.com/package/)
![js-google-style](https://img.shields.io/badge/code%20style-google-brightgreen.svg?style=for-the-badge)
[![Documentation](https://img.shields.io/badge/DOCUMENTATION-WIKI-green?style=for-the-badge)](https://github.com/bostrot/telegram-support-bot/wiki)

> TSB is a support bot for Telegram. It lets users create tickets which will be sent to a staff group and can be answered by a reply.  
> Now also supports LLMs (e.g. OpenAI) to automatically assist users.

<table>
<tr>
<th><img src="https://i.imgur.com/du5KZ1C.jpg" /></th>
<th><img src="https://i.imgur.com/N2002b0.jpg" /></th>
</tr>
</table>

> 🚀 **Hosted solution**: Get it [here at botspace](https://botspace.bostrot.com)!

## ✨ Features

When a user sends a message to the support chat it will create a ticket which will be forwarded to the staff group. Any admin in the staff group may answer that ticket by just replying to it. Salutation is added automatically. Photos will be forwarded too.

- [x] File forwarding from and to user
- [x] Database for handling open and closed tickets
- [x] Restrict users
- [x] Simple anti spam system
- [x] Send tickets to different staff groups
- [x] Private reply to user
- [x] Anonymize users
- [x] Auto reply based on keywords [beta]
- [x] Web chat [beta]

- [x] **LLM support (OpenAI, OpenAI-compatible APIs)** – generate automatic responses using large language models

## 🤖 OpenAi Integration

The bot can now optionally connect to an LLM like OpenAI (or any OpenAI-compatible API) to automatically respond to users, especially for common questions or when no staff is available.

You can enable this by setting the following environment variables:

```bash
USE_LLM=true
LLM_API_KEY=your_api_key_here
LLM_BASE_URL=https://api.openai.com/v1
LLM_MODEL=gpt-4o-mini
LLM_KNOWLEDGE="Q: What is Botspace? A: Botspace is a cloud-based project management tool designed for teams to collaborate, track tasks, and manage workflows efficiently. Q: What platforms are supported? A: Web, iOS, and Android."
```

> Use cases: FAQ generation, fallback replies when no staff replies, 24/7 automated assistant, hybrid staff-AI workflows.

## 📜 Commands

Currently the support chat offers these commands (staff commands):

- `/open` - lists all open tickets (messages where no one has replied yet)
- `/reopen` - reopen a closed ticket
- `/close` - close a ticket manually (in case someone writes 'thank you')
- `/ban` - ban a person from writing to your chat

User commands:

- `/start` - tells the user how to use this bot
- `/help` - an overview over the commands or some explanation for the user
- `/faq` - shows the FAQ
- `/id` - returns your Telegram id and the group chat id

## 📦 Install

See the [wiki](https://github.com/bostrot/telegram-support-bot/wiki) for more detailed instructions.

### Quick Start with Docker Compose

1. Clone the repository
2. Set your environment variables in `docker-compose.yml`:
   - `BOT_TOKEN` - Your Telegram bot token from @BotFather
   - `STAFFCHAT_ID` - Your staff group/supergroup ID
   - `OWNER_ID` - Your Telegram user ID
3. Run the bot:

```bash
docker-compose up -d
```

### Environment Variables

This bot now uses environment variables instead of a config file. See [ENV_VARIABLES.md](ENV_VARIABLES.md) for a complete list of all available environment variables.

For Coolify deployment, simply add the environment variables in the Coolify dashboard.

## 📝 Upgrading from older versions

There are some breaking changes in the new versions. Please read the following instructions carefully when updating.

<details>
<summary>click here to show</summary>

Since version v4 this bot uses the grammY Telegram Bot Framework instead of the telegraf framework for various reasons.

### Upgrading to v4.0.0

Make sure you add the new settings strings to your config.yaml file. Check the config-sample.yaml for all configs.
Here are some of the new settings that you should add when migrating:

    parse_mode: 'Markdown' # DO NOT CHANGE!
    autoreply: (see config-sample.yaml for an example)

The config-sample.yaml settings now all use markdown instead of HTML so you have to adjust that. e.g. instead of <br/> line break use \n instead. For a full list check the telegram bot API docs.

Upgrade to the new version. e.g. by pulling the main branch from GitHub or using the docker image bostrot/telegram-support-bot:4.0.0.

Start it.

The old database should work with the new version without changing anything.

### Upgrading to v3.0.0

The latest version uses a new config file in YAML format which would break old versions.

In order to make old versions work with the master you would need to use the new config.yaml file instead of the config.ts file from before. The easiest would be if you copy the config-sample.yaml to config.yaml (both in the config folder) and edit the settings similar to your old config.ts file. There is no need to delete the database file so old tickets can be kept open.

</details>

You might also want to check out the [wiki](https://github.com/bostrot/telegram-support-bot/wiki) for more info.

## Author

👤 **Eric Trenkel**

- Website: [erictrenkel.com](erictrenkel.com)
- Github: [@bostrot](https://github.com/bostrot)
- LinkedIn: [@erictrenkel](https://linkedin.com/in/erictrenkel)

👥 **Contributors**

[![Contributors](https://contrib.rocks/image?repo=bostrot/telegram-support-bot)](https://github.com/bostrot/telegram-support-bot/graphs/contributors)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/bostrot/telegram-support-bot/issues). You can also take a look at the [contributing guide](https://github.com/bostrot/telegram-support-bot/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2025 [Eric Trenkel](https://github.com/bostrot).  
This project is [GPL-3.0](https://github.com/bostrot/telegram-support-bot/blob/master/LICENSE) licensed.

---

_Not found what you were looking for? Check out the [Wiki](https://github.com/bostrot/telegram-support-bot/wiki)_

If you need help or need a hosted solution of this check out [Botspace](https://botspace.bostrot.com) for a one-click setup.
