import { Config, Language, Autoreply, Category, ParseMode, Messenger } from './interfaces';

declare const process: {
  env: { [key: string]: string | undefined };
};

function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key];
  if (!value && defaultValue === undefined) {
    throw new Error(`Environment variable ${key} is required`);
  }
  return value || defaultValue || '';
}

function getEnvVarAsNumber(key: string, defaultValue: number): number {
  const value = getEnvVar(key, defaultValue.toString());
  const num = parseInt(value, 10);
  if (isNaN(num)) {
    throw new Error(`Environment variable ${key} must be a valid number`);
  }
  return num;
}

function getEnvVarAsBoolean(key: string, defaultValue: boolean): boolean {
  const value = getEnvVar(key, defaultValue.toString());
  return value.toLowerCase() === 'true';
}

function parseLanguage(): Language {
  return {
    startCommandText: getEnvVar('LANGUAGE_START_COMMAND_TEXT', 'Welcome in our support chat! Ask your question here.'),
    faqCommandText: getEnvVar('LANGUAGE_FAQ_COMMAND_TEXT', 'Get this bot at: [github.com](https://github.com/bostrot/telegram-support-bot)'),
    helpCommandText: getEnvVar('LANGUAGE_HELP_COMMAND_TEXT', '*Available commands:* /help /faq /id'),
    helpCommandStaffText: getEnvVar('LANGUAGE_HELP_COMMAND_STAFF_TEXT', '*Available commands:*\n/start - Get a little introduction \n/faq - Show frequently asked questions \n/open - *Staff* Shows a list of open tickets \n/reopen - *Staff* Reopen a closed ticket \n/close - *Staff* Reply to a ticket with this to close and unban \n/clear - *Staff* Closes all tickets \n/ban - *Staff* Ban a user from the chat \n/unban - *Staff* Unban a user'),
    confirmationMessage: getEnvVar('LANGUAGE_CONFIRMATION_MESSAGE', 'Thank you for contacting us. We will answer as soon as possible.'),
    contactMessage: getEnvVar('LANGUAGE_CONTACT_MESSAGE', 'Thank you for contacting us. We will answer as soon as possible.'),
    blockedSpam: getEnvVar('LANGUAGE_BLOCKED_SPAM', 'You sent quite a number of questions in the last while. Please calm down and wait until staff reviews them.'),
    ticket: getEnvVar('LANGUAGE_TICKET', 'Ticket'),
    closed: getEnvVar('LANGUAGE_CLOSED', 'closed'),
    acceptedBy: getEnvVar('LANGUAGE_ACCEPTED_BY', 'was accepted by'),
    dear: getEnvVar('LANGUAGE_DEAR', 'Hi'),
    regards: getEnvVar('LANGUAGE_REGARDS', 'Regards,'),
    from: getEnvVar('LANGUAGE_FROM', 'from'),
    language: getEnvVar('LANGUAGE_LANGUAGE', 'Language'),
    msg_sent: getEnvVar('LANGUAGE_MSG_SENT', 'Message sent to user'),
    file_sent: getEnvVar('LANGUAGE_FILE_SENT', 'File sent to user'),
    usr_with_ticket: getEnvVar('LANGUAGE_USR_WITH_TICKET', 'User with ticket'),
    banned: getEnvVar('LANGUAGE_BANNED', 'banned'),
    replyPrivate: getEnvVar('LANGUAGE_REPLY_PRIVATE', 'Reply in private'),
    services: getEnvVar('LANGUAGE_SERVICES', 'Select a service from the list below'),
    customer: getEnvVar('LANGUAGE_CUSTOMER', 'customer'),
    msgForwarding: getEnvVar('LANGUAGE_MSG_FORWARDING', 'You messages will now be forwarded to vendors of the group: '),
    back: getEnvVar('LANGUAGE_BACK', 'Go back'),
    whatSubCategory: getEnvVar('LANGUAGE_WHAT_SUB_CATEGORY', 'Which subcategory describes your needs the best? '),
    prvChatEnded: getEnvVar('LANGUAGE_PRV_CHAT_ENDED', 'Private chat ended.'),
    prvChatOpened: getEnvVar('LANGUAGE_PRV_CHAT_OPENED', 'Private Chat opened with customer.'),
    prvChatEnd: getEnvVar('LANGUAGE_PRV_CHAT_END', 'End Private chat'),
    prvChatOpenedCustomer: getEnvVar('LANGUAGE_PRV_CHAT_OPENED_CUSTOMER', 'Opened private chat'),
    instructionsSent: getEnvVar('LANGUAGE_INSTRUCTIONS_SENT', 'Instructions were sent to you in private chat.'),
    openTickets: getEnvVar('LANGUAGE_OPEN_TICKETS', 'Open Tickets'),
    support: getEnvVar('LANGUAGE_SUPPORT', 'Support'),
    prvChatOnly: getEnvVar('LANGUAGE_PRV_CHAT_ONLY', 'This command can be used in private chat only.'),
    ticketClosed: getEnvVar('LANGUAGE_TICKET_CLOSED', 'Your ticket was closed by our staff. You can open a new ticket at any time.'),
    links: getEnvVar('LANGUAGE_LINKS', 'Direct support links'),
    textFirst: getEnvVar('LANGUAGE_TEXT_FIRST', 'Please send us a message before sending an image so that we can help you better.'),
    ticketClosedError: getEnvVar('LANGUAGE_TICKET_CLOSED_ERROR', 'You cannot reply to a closed ticket.'),
    automatedReply: getEnvVar('LANGUAGE_AUTOMATED_REPLY', 'This is an automated reply.'),
    automatedReplyAuthor: getEnvVar('LANGUAGE_AUTOMATED_REPLY_AUTHOR', 'BottyBot.'),
    doesntHelp: getEnvVar('LANGUAGE_DOESNT_HELP', 'This does not help.'),
    automatedReplySent: getEnvVar('LANGUAGE_AUTOMATED_REPLY_SENT', 'Automated reply was send to the user.'),
    ticketReopened: getEnvVar('LANGUAGE_TICKET_REOPENED', 'Ticket reopened.'),
    yourTicketId: getEnvVar('LANGUAGE_YOUR_TICKET_ID', 'Your ticket ID'),
    regardsGroup: getEnvVar('LANGUAGE_REGARDS_GROUP', 'Botty Group'),
    autoreply: parseAutoreply()
  };
}

function parseAutoreply(): Autoreply[] {
  const autoreplyEnv = getEnvVar('AUTOREPLY', '');
  if (!autoreplyEnv) {
    return [
      {
        question: 'install',
        answer: 'If you want to install the bot, you can use the following link: [Getting Started](https://github.com/bostrot/telegram-support-bot/wiki/Getting-started) Alternatively you can also use our one-click setup & hosting service: [Botspace](https://botspace.bostrot.com/)'
      },
      {
        question: 'are you sure?',
        answer: 'Yes.'
      }
    ];
  }

  try {
    return JSON.parse(autoreplyEnv);
  } catch (error) {
    console.error('Failed to parse AUTOREPLY environment variable:', error);
    return [];
  }
}

function parseCategories(): Category[] {
  const categoriesEnv = getEnvVar('CATEGORIES', '');
  if (!categoriesEnv) {
    return [];
  }

  try {
    return JSON.parse(categoriesEnv);
  } catch (error) {
    console.error('Failed to parse CATEGORIES environment variable:', error);
    return [];
  }
}

export function loadConfig(): Config {
  return {
    bot_token: getEnvVar('BOT_TOKEN'),
    spam_cant_msg: getEnvVarAsNumber('SPAM_CANT_MSG', 5),
    staffchat_id: getEnvVar('STAFFCHAT_ID'),
    staffchat_type: Messenger.TELEGRAM,
    staffchat_parse_mode: ParseMode.MarkdownV2,
    owner_id: getEnvVar('OWNER_ID'),
    spam_time: getEnvVarAsNumber('SPAM_TIME', 300000),
    parse_mode: getEnvVar('PARSE_MODE', 'Markdown'),
    allow_private: getEnvVarAsBoolean('ALLOW_PRIVATE', false),
    direct_reply: getEnvVarAsBoolean('DIRECT_REPLY', false),
    auto_close_tickets: getEnvVarAsBoolean('AUTO_CLOSE_TICKETS', true),
    anonymous_tickets: getEnvVarAsBoolean('ANONYMOUS_TICKETS', true),
    anonymous_replies: getEnvVarAsBoolean('ANONYMOUS_REPLIES', true),
    show_auto_replied: getEnvVarAsBoolean('SHOW_AUTO_REPLIED', false),
    show_user_ticket: getEnvVarAsBoolean('SHOW_USER_TICKET', false),
    autoreply_confirmation: getEnvVarAsBoolean('AUTOREPLY_CONFIRMATION', true),
    clean_replies: getEnvVarAsBoolean('CLEAN_REPLIES', false),
    pass_start: getEnvVarAsBoolean('PASS_START', false),
    web_server: getEnvVarAsBoolean('WEB_SERVER', false),
    web_server_port: getEnvVarAsNumber('WEB_SERVER_PORT', 8080),
    web_server_ssl_cert: getEnvVar('WEB_SERVER_SSL_CERT', ''),
    web_server_ssl_key: getEnvVar('WEB_SERVER_SSL_KEY', ''),
    dev_mode: getEnvVarAsBoolean('DEV_MODE', true),
    mongodb_uri: getEnvVar('MONGODB_URI', 'mongodb://mongodb:27017/support'),
    use_llm: getEnvVarAsBoolean('USE_LLM', false),
    llm_api_key: getEnvVar('LLM_API_KEY', ''),
    llm_base_url: getEnvVar('LLM_BASE_URL', 'https://api.openai.com/v1'),
    llm_model: getEnvVar('LLM_MODEL', 'qwen-2.5-7b-instruct'),
    llm_knowledge: getEnvVar('LLM_KNOWLEDGE', ''),
    language: parseLanguage(),
    autoreply: parseAutoreply(),
    categories: parseCategories()
  };
} 