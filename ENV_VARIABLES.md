# Environment Variables

This bot now uses environment variables instead of a config file. Here are all the available environment variables:

## Required Environment Variables

- `BOT_TOKEN` - Your Telegram bot token from @BotFather
- `STAFFCHAT_ID` - The ID of your staff group/supergroup (e.g., -123456789)
- `OWNER_ID` - Your Telegram user ID

## Optional Environment Variables

### Basic Settings
- `SPAM_CANT_MSG` - Number of messages allowed before spam protection (default: 5)
- `SPAM_TIME` - Time window for spam protection in milliseconds (default: 300000)
- `PARSE_MODE` - Message parsing mode: Markdown, MarkdownV2, or HTML (default: Markdown)
- `DEV_MODE` - Enable development mode (default: true)

### Ticket Settings
- `AUTO_CLOSE_TICKETS` - Automatically close tickets after answering (default: true)
- `ANONYMOUS_TICKETS` - Include user ID in tickets (default: true)
- `ANONYMOUS_REPLIES` - Include staff member name in responses (default: true)
- `SHOW_AUTO_REPLIED` - Send auto-replied messages to staff chat (default: false)
- `SHOW_USER_TICKET` - Show ticket ID to user (default: false)
- `AUTOREPLY_CONFIRMATION` - Reply with confirmation message on each incoming message (default: true)
- `CLEAN_REPLIES` - Remove footer and header from response (default: false)
- `PASS_START` - Pass /start command to support directly (default: false)

### Private Chat Settings
- `ALLOW_PRIVATE` - Allow staff to chat privately with users (default: false)
- `DIRECT_REPLY` - Forward staff users to user chat when allow_private is true (default: false)

### Web Server Settings
- `WEB_SERVER` - Enable web server (default: false)
- `WEB_SERVER_PORT` - Port for web server (default: 8080)
- `WEB_SERVER_SSL_CERT` - SSL certificate path (optional)
- `WEB_SERVER_SSL_KEY` - SSL key path (optional)

### Database Settings
- `MONGODB_URI` - MongoDB connection string (default: mongodb://mongodb:27017/support)

### LLM Settings
- `USE_LLM` - Enable LLM for automated responses (default: false)
- `LLM_API_KEY` - API key for LLM service
- `LLM_BASE_URL` - Base URL for LLM API (default: https://api.openai.com/v1)
- `LLM_MODEL` - LLM model name (default: qwen-2.5-7b-instruct)
- `LLM_KNOWLEDGE` - Knowledge base for LLM responses

### Language Settings
All language strings can be customized with environment variables prefixed with `LANGUAGE_`:

- `LANGUAGE_START_COMMAND_TEXT` - Welcome message
- `LANGUAGE_FAQ_COMMAND_TEXT` - FAQ command response
- `LANGUAGE_HELP_COMMAND_TEXT` - Help command response for users
- `LANGUAGE_HELP_COMMAND_STAFF_TEXT` - Help command response for staff
- `LANGUAGE_CONFIRMATION_MESSAGE` - Confirmation message sent to users
- `LANGUAGE_BLOCKED_SPAM` - Spam protection message
- `LANGUAGE_TICKET` - "Ticket" text
- `LANGUAGE_CLOSED` - "closed" text
- `LANGUAGE_ACCEPTED_BY` - "was accepted by" text
- `LANGUAGE_DEAR` - "Hi" text
- `LANGUAGE_REGARDS` - "Regards," text
- `LANGUAGE_FROM` - "from" text
- `LANGUAGE_LANGUAGE` - "Language" text
- `LANGUAGE_MSG_SENT` - "Message sent to user" text
- `LANGUAGE_FILE_SENT` - "File sent to user" text
- `LANGUAGE_USR_WITH_TICKET` - "User with ticket" text
- `LANGUAGE_BANNED` - "banned" text
- `LANGUAGE_REPLY_PRIVATE` - "Reply in private" text
- `LANGUAGE_SERVICES` - "Select a service from the list below" text
- `LANGUAGE_CUSTOMER` - "customer" text
- `LANGUAGE_MSG_FORWARDING` - "You messages will now be forwarded to vendors of the group: " text
- `LANGUAGE_BACK` - "Go back" text
- `LANGUAGE_WHAT_SUB_CATEGORY` - "Which subcategory describes your needs the best? " text
- `LANGUAGE_PRV_CHAT_ENDED` - "Private chat ended." text
- `LANGUAGE_PRV_CHAT_OPENED` - "Private Chat opened with customer." text
- `LANGUAGE_PRV_CHAT_END` - "End Private chat" text
- `LANGUAGE_PRV_CHAT_OPENED_CUSTOMER` - "Opened private chat" text
- `LANGUAGE_INSTRUCTIONS_SENT` - "Instructions were sent to you in private chat." text
- `LANGUAGE_OPEN_TICKETS` - "Open Tickets" text
- `LANGUAGE_SUPPORT` - "Support" text
- `LANGUAGE_PRV_CHAT_ONLY` - "This command can be used in private chat only." text
- `LANGUAGE_TICKET_CLOSED` - "Your ticket was closed by our staff. You can open a new ticket at any time." text
- `LANGUAGE_LINKS` - "Direct support links" text
- `LANGUAGE_TEXT_FIRST` - "Please send us a message before sending an image so that we can help you better." text
- `LANGUAGE_TICKET_CLOSED_ERROR` - "You cannot reply to a closed ticket." text
- `LANGUAGE_AUTOMATED_REPLY` - "This is an automated reply." text
- `LANGUAGE_AUTOMATED_REPLY_AUTHOR` - "BottyBot." text
- `LANGUAGE_DOESNT_HELP` - "This does not help." text
- `LANGUAGE_AUTOMATED_REPLY_SENT` - "Automated reply was send to the user." text
- `LANGUAGE_TICKET_REOPENED` - "Ticket reopened." text
- `LANGUAGE_YOUR_TICKET_ID` - "Your ticket ID" text
- `LANGUAGE_REGARDS_GROUP` - "Botty Group" text

### Advanced Settings
- `AUTOREPLY` - JSON array of autoreply rules (optional)
- `CATEGORIES` - JSON array of categories and subgroups (optional)

## Example Usage

```bash
# Required variables
export BOT_TOKEN="your_bot_token_here"
export STAFFCHAT_ID="-123456789"
export OWNER_ID="your_telegram_id"

# Optional customizations
export AUTO_CLOSE_TICKETS="true"
export ANONYMOUS_TICKETS="false"
export LANGUAGE_START_COMMAND_TEXT="Welcome to our support! How can we help you today?"
```

## Docker Compose

When using Docker Compose, set the environment variables in the `environment` section:

```yaml
services:
  supportbot:
    build: .
    environment:
      - BOT_TOKEN=your_bot_token_here
      - STAFFCHAT_ID=-123456789
      - OWNER_ID=your_telegram_id
      - AUTO_CLOSE_TICKETS=true
      - ANONYMOUS_TICKETS=false
```

## Coolify Deployment

For Coolify deployment, add all the environment variables you want to customize in the Coolify dashboard. Only the required variables (`BOT_TOKEN`, `STAFFCHAT_ID`, `OWNER_ID`) need to be set - all others will use sensible defaults. 