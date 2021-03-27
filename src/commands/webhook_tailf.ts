import {Command, flags} from '@oclif/command'
import { WebhookListnerimpl } from '../lib/service/impls/WebhookListner/WebhookListnerImpl';
import { RzpCliService } from '../lib/service/RzpCliService';

export default class webhook_tailf extends Command {
  static description = 'listen to webhook post calls'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
     name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    // force: flags.boolean({char: 'f'}),
  }

  //static args = [{name: 'operartion'}]

  async run() {
    const {args, flags} = this.parse(webhook_tailf)

    console.log(args);
    console.log(flags);

   var service : RzpCliService = new WebhookListnerimpl();

   service.init();

    //this.log(``)

  }
}
