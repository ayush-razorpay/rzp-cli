import {Command, flags} from '@oclif/command'

export default class WebhookListen extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),

    url: flags.string({char: 'u', 
    required: true,
    description: 'App url for Webhook Payload forwarding'}),

  }

 

  async run() {
    const {args, flags} = this.parse(WebhookListen)

    const url = flags.url ;
    this.log(`hello ${url} from /Users/ayush.vipul/Desktop/workspace/rzp-cli/src/commands/webhook_listen.ts`)

  }
}
