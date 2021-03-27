import {Command, flags} from '@oclif/command'
import { WebhookEventPlayService } from '../lib/service/impls/play-webhook-events/WebhookEventPlayService'

export default class ReplayWebhookEvents extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'query'}]

  async run() {
    const {args, flags} = this.parse(ReplayWebhookEvents)

    if(!(args && args.query))
    throw new Error("Webhook event type query missing in command.");

    let service = new WebhookEventPlayService();
    service.replayEvent(args.query);
    //const name = flags.name ?? 'world'
   // console.log(args.query);
    //this.log(`hello ${name} from /Users/ayush.vipul/Desktop/workspace/rzp-cli/src/commands/replay_webhook_events.ts`)
    // if (args.file && flags.force) {
    //   this.log(`you input --force and --file: ${args.file}`)
    // }
  }
}
