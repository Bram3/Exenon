import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class GuildSettingsEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  guildId: string

  @Column()
  name: string

  @Column()
  value: string

  @Column({ type: 'datetime', default: () => "datetime('now')" })
  createdAt: Date

  @Column({ type: 'datetime', default: () => "datetime('now')" })
  updatedAt: Date
}
