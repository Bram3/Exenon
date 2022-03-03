import { Guild } from 'discord.js'
import { Client } from 'discordx'
import { container } from 'tsyringe'

export function isTextChannel(channelId: string, guild: Guild) {
  const client: Client = container.resolve(Client)

  var channel = guild.channels.cache.get(channelId)

  if (channel === undefined) {
    return false
  }
  return true
}
