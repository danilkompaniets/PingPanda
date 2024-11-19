import { REST } from "@discordjs/rest"
import {
  APIEmbed,
  RESTPostAPIChannelMessageResult,
  RESTPostAPICurrentUserCreateDMChannelResult,
  Routes,
} from "discord-api-types/v10"

export class DiscordClient {
  private rest: REST

  constructor(token: string | undefined) {
    this.rest = new REST({
      version: "10",
    }).setToken(token ?? "")
  }

  async createDm(userId: string): Promise<RESTPostAPICurrentUserCreateDMChannelResult> {
    return this.rest.post(Routes.userChannels(), {
      body: {
        recipient_id: userId,
      },
    }) as Promise<RESTPostAPICurrentUserCreateDMChannelResult>
  }

  async sendEmbed(chanelId: string, embed: APIEmbed): Promise<RESTPostAPIChannelMessageResult> {
    return this.rest.post(Routes.channelMessages(chanelId), {
      body: {
        embeds: [embed],
      },
    }) as Promise<RESTPostAPIChannelMessageResult>
  }
}