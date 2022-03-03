import 'reflect-metadata';
import { config } from 'dotenv';
import logger from './utils/Logger';
import { container, inject, singleton } from 'tsyringe';
import { Beans } from './DI/Beans';
import { Client, DIService } from 'discordx';
import { Intents } from 'discord.js';
import { importx } from '@discordx/importer';
import { Connection, createConnection } from 'typeorm';

config();

@singleton()
export class Main {
  constructor(@inject(Beans.Token) private token: string) {}
  public async start(): Promise<void> {
    const connection = await createConnection({
      type: 'better-sqlite3',
      database: './data/database.sqlite',
      synchronize: true,
      entities: [__dirname + '/database/entities/*.{js,ts}'],
    });

    const client = new Client({
      botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
      ],
    });

    await importx(`${__dirname}/{commands,events}/**/*.{ts,js}`);

    container.registerInstance(Client, client);
    container.registerInstance(Connection, connection);

    logger.info('Connecting...');
    await client.login(this.token);
  }
}

const { TOKEN } = process.env;
if (!TOKEN) {
  logger.error('Token not found! Please set your token in the .env file.');
  process.exit();
}

DIService.container = container;
container.registerInstance(Beans.Token, TOKEN);
(async (): Promise<void> => {
  await container.resolve(Main).start();
})();
