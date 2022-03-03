import { CommandInteraction } from 'discord.js';
import { Discord, Slash, SlashChoice, SlashGroup, SlashOption } from 'discordx';
import { injectable } from 'tsyringe';
import { getCustomRepository } from 'typeorm';
import { GuildSettingsRepository } from '../database/repositories/GuildSettingsRepository';
import { SETTINGS } from '../enums/SettingsEnum';
import { isTextChannel } from '../utils/Channel';
import { errorEmbed, mainEmbed, replyOrFollowUpEmbed } from '../utils/Embed';
import { isStringBoolean, stringToBoolean } from '../utils/String';

@Discord()
@injectable()
@SlashGroup({
  name: 'settings',
  description: 'Get or set a setting for your guild.',
})
@SlashGroup('settings')
export class Settings {
  settingsRepository = getCustomRepository(GuildSettingsRepository);
  @Slash('set', { description: 'Set a setting for your guild.' })
  @SlashGroup('settings')
  async set(
    @SlashChoice(SETTINGS)
    @SlashOption('name', {
      description: 'The name of the setting you wish to change.',
      required: true,
    })
    name: SETTINGS,
    @SlashOption('value', {
      type: 'STRING',
      description: 'The value of the setting you wish to change.',
      required: true,
    })
    value: string,
    interaction: CommandInteraction,
  ): Promise<unknown> {
    switch (name) {
      case SETTINGS.logsEnabled:
        if (!isStringBoolean(value))
          return replyOrFollowUpEmbed(
            errorEmbed('The value should be a **boolean** (true or false).'),
            interaction,
          );
        const boolValue = stringToBoolean(value);
        this.settingsRepository.createOrUpdateSetting(
          name,
          String(boolValue),
          interaction.guildId,
        );
        replyOrFollowUpEmbed(
          mainEmbed(`**${name}** has been set to **${boolValue}**.`),
          interaction,
        );
      case SETTINGS.logsChannelId:
        if (!isTextChannel(value, interaction.guild))
          return replyOrFollowUpEmbed(
            errorEmbed('The value should be a valid **channelId**.'),
            interaction,
          );
        await this.settingsRepository.createOrUpdateSetting(
          name,
          value,
          interaction.guildId,
        );
        replyOrFollowUpEmbed(
          mainEmbed(`**${name}** has been set to **${value}**.`),
          interaction,
        );
    }
  }

  @Slash('get', { description: 'Get a setting from your guild.' })
  @SlashGroup('settings')
  async get(
    @SlashChoice(SETTINGS)
    @SlashOption('name', {
      description: 'The name of the setting you wish to get.',
      required: true,
    })
    name: SETTINGS,
    interaction: CommandInteraction,
  ): Promise<unknown> {
    const setting = await this.settingsRepository.getSetting(
      name,
      interaction.guildId,
    );
    if (setting === undefined) {
      return replyOrFollowUpEmbed(
        mainEmbed(
          `The value of **${name}** is currently not set. Please use **/settings set ${name} value** to set the setting.`,
        ),
        interaction,
      );
    }
    return replyOrFollowUpEmbed(
      mainEmbed(`The value of **${name}** is **${setting.value}**`),
      interaction,
    );
  }
}
