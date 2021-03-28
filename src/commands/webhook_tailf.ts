import {Command, flags} from '@oclif/command'
import { WebhookListnerimpl } from '../lib/service/impls/WebhookListner/WebhookListnerImpl';
import { RzpCliService } from '../lib/service/RzpCliService';
import cli from "cli-ux";

export default class webhook_tailf extends Command {
  static description = 'listen to webhook post calls'

  static flags = {
    help: flags.help({char: 'h'}),
     name: flags.string({char: 'n', description: 'name to print'}),
  }

  async run() {
    
    cli.action.start("Configuring your cli with remote server");
    const {args, flags} = this.parse(webhook_tailf)

    var service : RzpCliService = new WebhookListnerimpl();

    service.init();

   
 
  }
}
