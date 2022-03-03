import { Guild } from 'discord.js';

export function isTextChannel(channelId: string, guild: Guild) {
  var channel = guild.channels.cache.get(channelId);

  if (channel === undefined) {
    return false;
  }
  return true;
}
