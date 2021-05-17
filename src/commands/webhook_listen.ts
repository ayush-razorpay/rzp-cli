import {Command, flags} from '@oclif/command'
import cli from "cli-ux";

const validUrl = require('valid-url');
const express = require('express')
const app = express()
const port = 3000

export default class WebhookListen extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),

    url: flags.string({char: 'u', 
    required: true,
    description: 'App url for Webhook http request forwarding'}),

  }

//logs for keys and validate 
//get a local tunnel url
//register the url with apiCliRouter
//start litening and forwarding request 

  async run() {
    const {args, flags} = this.parse(WebhookListen)

    const url = flags.url ;

    cli.action.start("initilizing webhook listen service");

    if (! validUrl.isUri(url)){
      cli.error('Not a valid app url :'+url);
      }

    this.log(`hello ${url} from /Users/ayush.vipul/Desktop/workspace/rzp-cli/src/commands/webhook_listen.ts`)

  }




}
