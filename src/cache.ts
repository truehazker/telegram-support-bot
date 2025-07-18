import { Cache } from './interfaces';
import { loadConfig } from './config';

const cache: Cache = {
  userId: '',
  ticketIDs: [],
  ticketStatus: {},
  ticketSent: [],
  html: '',
  noSound: '',
  markdown: '',
  io: {},
  config: loadConfig(),
};

export default cache;
