import { EntityManager, EntityRepository, Repository } from 'typeorm'
import { SETTINGS } from '../../enums/SettingsEnum'
import { GuildSettingsEntity } from '../entities/GuildSettingsEntity'

@EntityRepository(GuildSettingsEntity)
export class GuildSettingsRepository extends Repository<GuildSettingsEntity> {
  async createOrUpdateSetting(
    name: SETTINGS,
    value: string,
    guildId: string
  ): Promise<void> {
    const setting = new GuildSettingsEntity()
    setting.guildId = guildId
    setting.name = name
    setting.value = value
    await this.save(setting)
  }

  async getSetting(
    name: SETTINGS,
    guildId: string
  ): Promise<GuildSettingsEntity> | undefined {
    const setting = await this.findOne({
      where: { name: name, guildId: guildId }
    })
    return setting
  }
}
