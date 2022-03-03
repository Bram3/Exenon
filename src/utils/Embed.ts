import { CommandInteraction, MessageEmbed } from 'discord.js'

export function errorEmbed(description: string) {
  return new MessageEmbed()
    .setTitle('Error')
    .setDescription(description)
    .setColor('#FF555E')
}

export function mainEmbed(description: string, title?: string) {
  if (typeof title === 'undefined') {
    return new MessageEmbed().setDescription(description).setColor('#8BF18B')
  }
  return new MessageEmbed()
    .setTitle(title)
    .setDescription(description)
    .setColor('#8BF18B')
}

export function replyOrFollowUpEmbed(
  embed: MessageEmbed,
  interaction: CommandInteraction
) {
  if (interaction.replied) {
    interaction.followUp({ embeds: [embed] })
  }
  interaction.reply({ embeds: [embed] })
}
