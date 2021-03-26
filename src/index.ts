import {Command, flags} from '@oclif/command'
import { LocaltunnelClient } from './lib/localTunnelClient';
import { WebhookListnerService } from './lib/WebhookListnerService';


class RzpCli extends Command {
  static description = 'Webhook Util'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'arg1'}]

  async run() {

    const {args, flags} = this.parse(RzpCli)

    console.log(args)
    let webHookService = new WebhookListnerService();    webHookService.start();
    let lt = new LocaltunnelClient();                    lt.startTunnel();

    const name = flags.name ?? 'world'
    //this.log(`hello ${name} from ./src/index.ts`)
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}

export = RzpCli
